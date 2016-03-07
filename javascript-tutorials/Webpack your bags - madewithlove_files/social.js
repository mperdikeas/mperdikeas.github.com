(function (win, doc) {

  var blogPost, socialMediaLinks, networksList, addMethods;

  addMethods = {};

  var init = function () {
    blogPost = doc.querySelector('.blog-post article');

    if (!blogPost) {
      return;
    }

    showShareLinks();
  };


  var showShareLinks = function (event) {
    var title, url;

    if (event) {
      event.preventDefault();
    }

    socialMediaLinks = doc.createElement('aside');
    socialMediaLinks.className = 'social-media-links';

    networksList = doc.createElement('ul');

    title = blogPost.parentNode.querySelector('header h1').innerText;
    url = [win.location.protocol, '//', win.location.host, win.location.pathname].join('');

    Object.keys(addMethods).forEach(function (site) {
      addSocialSite(site, url, title);
    });

    socialMediaLinks.addEventListener('click', checkForActivate);
    socialMediaLinks.appendChild(networksList);

    doc.querySelector('article').appendChild(socialMediaLinks);
  };


  var addSocialSite = function (site, url, title) {
    var listItem = doc.createElement('li');
    listItem.className = 'share-' + site.toLowerCase();
    addMethods[site](listItem, url, title);
    networksList.appendChild(listItem);
  };

  addMethods['Twitter'] = function (element, url, title) {
    var link = doc.createElement('a');
    link.setAttribute('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url) + '&via=madewithlove');
    link.innerHTML = 'Tweet this blogpost';
    element.appendChild(link);
  };


  addMethods['Facebook'] = function (element, url, title) {
    var link = doc.createElement('a');
    link.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
    link.innerHTML = 'Post on Facebook';
    element.appendChild(link);
  };


  addMethods['Buffer'] = function (element, url, title) {
    var link = doc.createElement('a');
    link.setAttribute('href', 'http://bufferapp.com/add');
    link.setAttribute('data-text', title);
    link.setAttribute('data-url', url);
    link.setAttribute('data-count', 'horizontal');
    link.setAttribute('data-via', 'madewithlove');
    link.setAttribute('data-activate-src', 'https://d389zggrogs7qo.cloudfront.net/js/button.js');
    link.innerHTML = 'Add to Buffer';
    link.className = 'buffer-add-button click-to-activate';
    element.appendChild(link);
  };


  addMethods['Pocket'] = function (element, url, title) {
    var link = doc.createElement('a');
    link.setAttribute('href', 'https://getpocket.com/save?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title));
    link.innerHTML = 'Add to Pocket';
    element.appendChild(link);
  }


  if (navigator.userAgent.match(/Android|iPhone/i) && !navigator.userAgent.match(/iPod|iPad/i)) {
    addMethods['WhatsApp'] = function (element, url, title) {
      var link = doc.createElement('a');
      link.setAttribute('data-action', 'share/whatsapp/share');
      link.setAttribute('href', 'whatsapp://send?text=' + encodeURIComponent(title + ' ' + url));
      link.innerHTML = 'Share via WhatsApp';
      element.appendChild(link);
    };
  }


  var checkForActivate = function (event) {
    var script;

    if (!event.target.classList.contains('click-to-activate')) {
      return;
    }

    event.preventDefault();

    script = doc.createElement('script');
    script.src = event.target.getAttribute('async', 'async');
    script.src = event.target.getAttribute('data-activate-src');

    doc.body.appendChild(script);
  };


  if ('addEventListener' in win && 'querySelectorAll' in doc) {
    win.addEventListener('load', init);
  }

})(window, document);