package gr.neuropublic.neurojsfpilot.customerservice.backingBeans;

import java.io.Serializable;
import java.util.ResourceBundle;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import javax.faces.model.DataModel;
import javax.faces.model.ListDataModel;
import javax.faces.model.SelectItem;
import javax.faces.bean.ManagedProperty;
import java.util.logging.Logger;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import javax.faces.event.ActionEvent;
import javax.annotation.PostConstruct;
import java.util.Map;
import java.util.HashMap;
import javax.faces.event.ComponentSystemEvent;
import java.util.Collection;
import java.util.Date;

import org.joda.time.DateTime;

import mutil.base.Pair;
import mutil.base.Triad;

import gr.neuropublic.neurojsfpilot.persutil.QualifiedResultList;
import gr.neuropublic.neurojsfpilot.jsfutil.JsfUtil;
import gr.neuropublic.neurojsfpilot.customerservice.entities.Customer;
import gr.neuropublic.neurojsfpilot.customerservice.facades.CustomerFacade;
import gr.neuropublic.neurojsfpilot.customerservice.entities.Municipality;
import gr.neuropublic.neurojsfpilot.customerservice.facades.MunicipalityFacade;
import gr.neuropublic.neurojsfpilot.customerservice.converters.Some;

import gr.neuropublic.neurojsfpilot.customerservice.bizlogic.*;


@ManagedBean(name = "customerLController")
@SessionScoped
public class CustomerLController implements Serializable {
    private final static int SEARCH_LIMIT = 200;
    private final Logger l = Logger.getLogger(this.getClass().getName());

    @EJB(beanName = "CustomerService")
    private CustomerServiceLocal customerService;

    private Customer current;
    public Customer getCurrent() {return current;}
    public void setCurrent(Customer current) {
        l.info("setCurrent("+safeCustomerToString(current)+")");
        this.current = current;
    }
    public static String safeCustomerToString(Customer cust) {
        return cust==null?"null":(cust.getId()+":"+cust.getSurname()+" "+cust.getName());
    }
    public static String safeBooleanToString(Boolean b) {
        return b==null?"null":b.toString();
    }
    public static String safeSomeBooleanToString(Some<Boolean> sb) {
        if (sb==null) throw new RuntimeException();
        Boolean b = sb.aT;
        return safeBooleanToString(b);
    }
    public static String safeStringToString(String s) {
        return s==null?"null":s;
    }

    //    private String focus = null;
    // public String getFocus() { return focus; }
    // public void setFocus(String focus) { this.focus = focus; }

    private String nameDBConstraint;
    public String getNameDBConstraint() {return this.nameDBConstraint;}
    public void setNameDBConstraint(String nameDBConstraint) {this.nameDBConstraint = nameDBConstraint;}

    private String surnameDBConstraint;
    public String getSurnameDBConstraint() {return this.surnameDBConstraint;}
    public void setSurnameDBConstraint(String surnameDBConstraint) {this.surnameDBConstraint = surnameDBConstraint;}

    private String municpltDBConstraint;
    public String getMunicpltDBConstraint() {return this.municpltDBConstraint;}
    public void setMunicpltDBConstraint(String municpltDBConstraint) {this.municpltDBConstraint = municpltDBConstraint;}

    private Pair<DateTime, DateTime> ageDBConstraint = Pair.create( (DateTime) null, (DateTime) null);
    public void setAgeDBConstraint(Pair<DateTime, DateTime> ageDBConstraint) {this.ageDBConstraint = ageDBConstraint;}
    public Pair<DateTime, DateTime> getAgeDBConstraint() {return this.ageDBConstraint;}

    private Some<Boolean> employeeDBConstraint = new Some(null);

    public Some<Boolean> getEmployeeDBConstraint() {return this.employeeDBConstraint;}
    public void setEmployeeDBConstraint(Some<Boolean> employeeDBConstraint) {
        l.info("setting employee constraint to: "+safeSomeBooleanToString(employeeDBConstraint));
        this.employeeDBConstraint = employeeDBConstraint;
    }


    private String   surnameFilterConstraint;
    public String getSurnameFilterConstraint()                       { return this.surnameFilterConstraint;}
    public void   setSurnameFilterConstraint(String surnameFilterConstraint) {this.surnameFilterConstraint = surnameFilterConstraint;}
    // public void focusSurname() {this.focus = "surnamefilterfield"; l.info("just set focus to: "+focus);}

    private String   nameFilterConstraint;
    public String getNameFilterConstraint() {                    return this.nameFilterConstraint;                       }
    public void   setNameFilterConstraint(String nameFilterConstraint) {this.nameFilterConstraint = nameFilterConstraint;}

    


    @ManagedProperty(value="#{CustomerCEVController}")
    private CustomerCEVController customerCEVController;
    public CustomerCEVController getCustomerCEVController() {
        return customerCEVController;
    }

    public void setCustomerCEVController(CustomerCEVController customerCEVController) {
        this.customerCEVController = customerCEVController;
    }

    private List<Customer> items = null;
    public static String safeListSizeToString(List<?> aList) {
        return aList==null?"list is null":aList.size()+" elements";
    }

    private String resultsCommentary;
    public String getResultsCommentary() {return resultsCommentary;}

    private boolean resultsController = true;
    private boolean onlyTheFirstTime() {
        if (resultsController==true) {
            resultsController = false;
            return true;
        } else return false;
    }

    // According to the following article:
    // http://stackoverflow.com/questions/2830834/jsf-fevent-prerenderview-is-triggered-by-fajax-calls-and-partial-renders-some/11555571#11555571
    // the 'isPostback()' method may also provide a possibly more elegant solution to this as in:
    // FacesContext.getCurrentInstance().isPostback()
    // Also, for a strange reason it can't be put in the constructor as the ejbFacade hasn't been injected yet
    public void initResultsCommentary(ComponentSystemEvent event) {
        boolean always = true;
        if (always) throw new RuntimeException(); // not-used-any-more mine
        if (onlyTheFirstTime()) {
            l.info("calling getCustomers() inside initResultsCommentary");
            items = getCustomers();
        }
    }

    boolean alreadyCalledOnce = false;
    @PostConstruct
    public void init() {
        if (alreadyCalledOnce) throw new RuntimeException();
        items = getCustomers();
        alreadyCalledOnce = true;
    }


    private static String yesNoWords(String yesOrNo) {
        if (yesOrNo.equals("yes")) return "ναι"; else return "όχι";
    }


    public List<String> getMunicipalityNames(String startsWith) {
        QualifiedResultList<Municipality> municipalities = municipalityFacade.getMunicipalitiesNameStartsWith(startsWith);
        List<String> municipalityNames = new ArrayList<String>();
        for (Municipality municipality : municipalities.data) {
            municipalityNames.add(municipality.getName());
        }
        return municipalityNames;
    }

    public SelectItem[] getEmployeeOptions() {
        String[] data = new String[]{"yes", "no"};
        SelectItem[] options = new SelectItem[data.length + 1];  
  
        options[0] = new SelectItem("", "Επιλογή");  
        for(int i = 0; i < data.length; i++) {  
            options[i + 1] = new SelectItem(data[i], yesNoWords(data[i]));
        }  
        return options;  
    }

    @EJB
    private CustomerFacade ejbFacade;

    @EJB
    private MunicipalityFacade municipalityFacade;

    public void clearDBConstraintsListener(ActionEvent notUsed) {
        l.info("clearing fields");
        nameDBConstraint      =         null;
        surnameDBConstraint   =         null;
        municpltDBConstraint  =         null;
        employeeDBConstraint  =new Some(null);
        ageDBConstraint       =         null;
    }

    public void applyDBConstraintsListener(ActionEvent notUsed) {
        l.info("before calling getCustomers size of items is: "+safeListSizeToString(items));
        items = getCustomers();
        l.info("after calling getCustomers size of items is: "+safeListSizeToString(items));
    }

    private static final void addToCriteriaIfNotEmpty(Map<String, Object> criteria, String criterionKey, Object value) {
        if (value!=null) {
            if (value instanceof String) {
                String valueS = (String) value;
                if (!valueS.trim().equals(""))
                    criteria.put(criterionKey, valueS.trim());
            } else criteria.put(criterionKey, value);
        }
    }

    public List<Customer> getCustomers() {
        QualifiedResultList<Customer> retValue = getFacade().getCustomers(nameDBConstraint, surnameDBConstraint, ageDBConstraint, municpltDBConstraint, employeeDBConstraint.aT, SEARCH_LIMIT);
        setResultsCommentary(retValue.data.size(), retValue.limit, retValue.theresMore);
        return retValue.data;
    }
                                                 

    public void setResultsCommentary(int datasize, int limit, boolean theresMore) {
        l.info("inside setResultsCommentary("+datasize+","+limit+","+theresMore+")");
        if (datasize==0) this.resultsCommentary = "δεν βρέθηκαν εγγραφές με αυτά τα κριτήρια";
        else if (theresMore) this.resultsCommentary = "στοιχεία για τις "+ datasize +
                                                      " πρώτες εγγραφές (υπάρχουν και άλλες - περιορίστε την αναζήτηση)";
        else this.resultsCommentary = "βρέθηκαν ακριβώς "+datasize+" εγγραφές";
        l.info("resultsCommentary is set to : "+this.resultsCommentary+" at the exit of setResultsCommentary");
    }

    public CustomerLController() {
    }

    public Customer getSelected() {
        if (current == null) {
            current = new Customer();
        }
        return current;
    }

    private CustomerFacade getFacade() {
        return ejbFacade;
    }


    public String prepareList() {
        // recreateModel(); // we likely don't need that, though I'm not 100% sure
        return "List";
    }

    public String prepareView() {
        return "View";
    }

    public String prepareCreate() {
        getCustomerCEVController().initCustomerCreateEditViewControllerForCreate(this,new Customer());        
        return "goToCreateEditView";
    }

    public String create() {
        try {
            getFacade().create(current);
            JsfUtil.addSuccessMessage(ResourceBundle.getBundle("/Bundle").getString("CustomerCreated"));
            return prepareCreate();
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/Bundle").getString("PersistenceErrorOccured"));
            return null;
        }
    }

    public String prepareEdit() {
        //Fetch the customer with his orders
        Map<String, Object> criteria = new HashMap<String, Object>();
        criteria.put(CustomerServiceUtils.SEARCH_CUSTOMERS_BY_ID, current.getId());
        ArrayList<Customer> customersById = (ArrayList<Customer>) customerService.getCustomers(criteria, true);
        
        System.out.println("Size = "+customersById.size());
        
        if (customersById.get(0) != null)
        {
            getCustomerCEVController().initCustomerCreateEditViewControllerForEdit(this,customersById.get(0));
            return "goToCreateEditView";
        }
        else
        {
            //stay on the current page if the customer was not found
            return null;
        }
    }

    public String update() {
        try {
            getFacade().edit(current);
            JsfUtil.addSuccessMessage(ResourceBundle.getBundle("/Bundle").getString("CustomerUpdated"));
            return "View";
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/Bundle").getString("PersistenceErrorOccured"));
            return null;
        }
    }

    public String destroy() {
        l.info(this.getClass().getName()+"::destroy current is: "+safeCustomerToString(current));
        performDestroy();
        recreateModel();
        return "List";
    }

    private void performDestroy() {
        try {
            // getFacade().remove(current); // the JPE em.remove type of removal doesn't seem to work
            getFacade().jpqlRemove(current);
            JsfUtil.addSuccessMessage(ResourceBundle.getBundle("/Bundle").getString("CustomerDeleted"));
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/Bundle").getString("PersistenceErrorOccured"));
        }
    }

    public List<Customer> getItems() {
        if (items == null) {
            items = getCustomers();
        }
        return items;
    }

    private boolean filterMismatch(Customer customer) {
        if ((surnameFilterConstraint != null) && (!customer.getSurname().startsWith(surnameFilterConstraint))) return true;
        if ((   nameFilterConstraint != null) && (!customer.   getName().startsWith(   nameFilterConstraint))) return true;
        return false;
    }

    public List<Customer> getFilteredItems() {
        List<Customer> retValue = new ArrayList<Customer>();
        for (Customer customer : getItems())
            if (filterMismatch(customer))
                ; // don't add this customer
            else 
                retValue.add(customer);
        return retValue;
    }

    private void recreateModel() {
        items = null;
    }

    public SelectItem[] getItemsAvailableSelectMany() {
        return JsfUtil.getSelectItems(getFacade().findAll(), false);
    }

    public SelectItem[] getItemsAvailableSelectOne() {
        return JsfUtil.getSelectItems(getFacade().findAll(), true);
    }

    @FacesConverter(forClass = Customer.class)
    public static class CustomerLControllerConverter implements Converter {

        public Object getAsObject(FacesContext facesContext, UIComponent component, String value) {
            if (value == null || value.length() == 0) {
                return null;
            }
            CustomerLController controller = (CustomerLController) facesContext.getApplication().getELResolver().
                    getValue(facesContext.getELContext(), null, "customerLController");
            return controller.getFacade().find(getKey(value));
        }

        java.lang.Integer getKey(String value) {
            java.lang.Integer key;
            key = Integer.valueOf(value);
            return key;
        }

        String getStringKey(java.lang.Integer value) {
            StringBuffer sb = new StringBuffer();
            sb.append(value);
            return sb.toString();
        }

        public String getAsString(FacesContext facesContext, UIComponent component, Object object) {
            if (object == null) {
                return null;
            }
            if (object instanceof Customer) {
                Customer o = (Customer) object;
                return getStringKey(o.getId());
            } else {
                throw new IllegalArgumentException("object " + object + " is of type " + object.getClass().getName() + "; expected type: " + CustomerLController.class.getName());
            }
        }
    }
}
