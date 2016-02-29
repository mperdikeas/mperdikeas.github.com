var isArray = function(x) {
    return Object.prototype.toString.call(x)===Object.prototype.toString.call([]);
};

var assert = function(condition, failMsg, successMsg) {
    if (!condition)
        throw new Error(failMsg || 'assertion error');
    else if (successMsg != undefined)
        console.log(successMsg);
};

var assertPredicate = function(vs, pred, failMsg, successMsg) {
    if (!isArray(vs))
        throw new Error();
    if (!isFunction(pred))
        throw new Error();
    if (!pred.length===2)
        throw new Error();
    var allEqual = true;
    var offending;
    loopOuter:
    for (i = 0 ; i < vs.length ; i++) {
        for (j = i+1; j < vs.length ; j++) {
            if (!pred(vs[i], vs[j])) {
                allEqual = false;
                offending = {i: i, j: j};
                break loopOuter;
            }
        }
    }
    if (!allEqual)
        throw new Error((failMsg||'')+ ' values are not equal in: '+JSON.stringify(offending));
    else if (successMsg != undefined)
        console.log(successMsg);
};

var assertEqual = function(vs, failMsg, successMsg) {
    return assertPredicate(vs, function(a,b) {return a==b;}, failMsg, successMsg);
};

var assertStrictEqual = function(vs, failMsg, successMsg) {
    return assertPredicate(vs, function(a,b) {return a===b;}, failMsg, successMsg);
};




(function() {
    if (Number.prototype.between===undefined) {
        Number.prototype.between = function(a, b, inclusive) {
            var min = Math.min.apply(Math, [a, b]),
                max = Math.max.apply(Math, [a, b]);
            return inclusive ? this >= min && this <= max : this > min && this < max;
        };
    }
})();

var assertException = function (f, exception, _ctx, _args, message) {
    var ctx = _ctx?_ctx:null;
    var args = _args?_args:[];
    var exceptionThrown = true;
    try {
        f.apply(ctx, args);
        exceptionThrown = false;
    } catch (e) {
        if (exception!=null) {
            if (!(e instanceof exception)) {
                throw new Error('expecting exception upon calling ['+f.name+'] to be a ['+exception.name+'] instead got a: ['+e.name+']');
            } else {
                var actualMessage = e.message;
                if ((message!=null) && (message != actualMessage)) {
                    throw new Error('Exception I received upon calling: ['+f.name+'] was: ['+exception.name+'] as expected, yet I was expecting message to be: ['+message+'] and instead I got: ['+actualMessage+']');
                }
            }
        } else {
            throw new Error('exception thrown upon calling: '+f.name+'() even though I was expecting none');
        }
    }
    if ((exception!=null)&& !exceptionThrown)
        throw new Error('function ['+f.name+'] was called without exception being thrown even though I was expecting ['+exception.name+']');

};

var getAllPropertyNames = function ( obj ) { // http://stackoverflow.com/a/8024294/274677
    var props = [];

    do {
        props= props.concat(Object.getOwnPropertyNames( obj ));
    } while ( (obj = Object.getPrototypeOf( obj )) != null);

    return props;
};

var bind = function bind (fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    };
};

var decimalToHex = function(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
};

var objectIsArray = function(someVar) {
    return Object.prototype.toString.call( someVar ) === '[object Array]';
};


var pointInRectangle = function (p, rec) {
    var xMatch = (p.x>=rec.x1) && (p.x<=rec.x2);
    var yMatch = (p.y>=rec.y1) && (p.y<=rec.y2);
    return xMatch && yMatch;
};

var range = function range(end, _start, _step) {
    var start = _start || 0;
    var step  = _step  || 1;
    var rv = [];
    for (var i = start; i < end; i+=step)
        rv.push(i);
    return rv;
};

var isInt = function isInt(n) {
    return n%1===0;
};

var IllegalArgumentException = function IllegalArgumentException(_message) {
    this.name = 'IllegalArgumentException';
    this.message = _message;
    this.stack = (new Error()).stack;
};
IllegalArgumentException.prototype = Object.create(Error.prototype);
IllegalArgumentException.prototype.constructor = IllegalArgumentException;

var timeCallInMs = function timeCallInMs(f, context, args) {
    context = context || null;
    args = args || [];
    var start = (new Date()).getTime();
    f.apply(context, args);
    var end = (new Date()).getTime();
    return end-start;
};

var isFunction = function isFunction (o) {
    return Function.prototype.isPrototypeOf(o);
};

var arraysEqualJSON = function(arr1, arr2) {
    if ((!objectIsArray(arr1)) || (!objectIsArray(arr2)))
        throw new Error('non array argument provided');
    else {
        var arr1JS = JSON.stringify(arr1);
        var arr2JS = JSON.stringify(arr2);
        return arr1JS === arr2JS;
    }
};


if ((typeof module === 'object') && (typeof module.exports === 'object')) {
    exports.isArray             = isArray;
    exports.assert              = assert;
    exports.assertPredicate     = assertPredicate;
    exports.assertEqual         = assertEqual;
    exports.assertStrictEqual   = assertStrictEqual;
    exports.assertException     = assertException;
    exports.getAllPropertyNames = getAllPropertyNames;
    exports.bind                = bind;
    exports.decimalToHex        = decimalToHex;
    exports.objectIsArray       = objectIsArray;
    exports.pointInRectangle    = pointInRectangle;
    exports.range               = range;
    exports.isInt               = isInt;
    exports.IllegalArgumentException = IllegalArgumentException;
    exports.timeCallInMs        = timeCallInMs;
    exports.isFunction          = isFunction;
    exports.arraysEqualJSON     = arraysEqualJSON;
} else { // I must be in the browser
    (function (){
        if (typeof mjb44 === 'undefined') {
            mjb44 = {};
        };
        if (typeof mjb44 != 'object')
            throw new Error('clash on the mjb44 name: '+mjb44);
        var theLibrary;
        mjb44.createUtilsLibrary = function () {
            if (typeof theLibrary != 'object') {
                theLibrary = 
                    {
                        isArray                 : isArray,
                        assert                  : assert,
                        assertPredicate         : assertPredicate,
                        assertEqual             : assertEqual,
                        assertStrictEqual       : assertStrictEqual,
                        assertException         : assertException,
                        getAllPropertyNames     : getAllPropertyNames,
                        bind                    : bind,
                        decimalToHex            : decimalToHex,
                        objectIsArray           : objectIsArray,
                        pointInRectangle        : pointInRectangle,
                        range                   : range,
                        isInt                   : isInt,
                        IllegalArgumentException: IllegalArgumentException,
                        timeCallInMs            : timeCallInMs,
                        isFunction              : isFunction,
                        arraysEqualJSON         : arraysEqualJSON                    
                    };
            }
            return theLibrary;
        };
    })();
}
