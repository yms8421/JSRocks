//IIFE -> Immediately Invoked Function Expressions
(function (w) {
    "use strict"
    var a = "Can PERK";
    var v = "1.0.0.0";
    var instance = null;
    var computeds = [];
    var attachers = [];

    function runComputeds() {
        for(var i = 0; i < computeds.length; i++) {
            var cmp = computeds[i];
            instance[cmp.propertyName] = cmp.handler(instance);
        }
    }

    function runAttachers() {
        for(var i = 0; i < attachers.length; i++) {
            var att = attachers[i];
            updateDOM(att.elementName, att.property);
        }
    }  

    function updateDOM(el, propertyName) {
        if (!propertyName) {
            document.getElementById(el).value = instance[el];
        }
        else {
            document.getElementById(el).value = instance[propertyName];
        }
    }

    var print = function() {
        console.log(instance);
    }
    var attach = function (el, propertyName) {
        updateDOM(el, propertyName);
        attachers.push({ elementName: el, property: propertyName });
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
            runAttachers();
        }
        else {
            throw "Property " + prop + " not found in the current context";
        }
    }

    var crComputed = function (name, callBack) {
        instance[name] = callBack(instance);
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
        print: print,
        attach: attach
    };

    w.ob = ob;
})(window);