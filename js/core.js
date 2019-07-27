//IIFE -> Immediately Invoked Function Expressions
(function (w) {
    "use strict"
    var a = "Can PERK";
    var v = "1.0.0.0";
    var instance = null;
    var computeds = [];

    function runComputeds() {
        for(var i = 0; i < computeds.length; i++) {
            var cmp = computeds[i];
            instance[cmp.propertyName] = cmp.handler();
        }
    }

    var print = function() {
        console.log(instance);
    }

    var co = function (value) {
        instance = value;
        return this;
    }

    var get = function () {
        return instance;
    }

    var set = function (prop, value) {
        if(instance.hasOwnProperty(prop))
        {
            instance[prop] = value;
            runComputeds();
        }
        else {
            throw "Property " + prop + " not found in the current context";
        }
    }

    var crComputed = function (name, callBack) {
        instance[name] = callBack();
        computeds.push({ 
            propertyName: name, 
            handler : callBack 
        });
    }
    var ob = {
        author: a,
        version: v,
        createObservable : co,
        get: get,
        set: set,
        createComputed: crComputed,
        print: print
    };

    w.ob = ob;
})(window);