(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, ko.merge = {});
    }
}
(function (ko, exports) {

    var knockoutElementMapping = function(knockoutElement, dataElement)
    {
        if(typeof(knockoutElement.mergeConstructor) == "undefined")
        {
            if (!ko.isComputed(knockoutElement))
            {
                if(knockoutElement.mergeMethod)
                { knockoutElement.mergeMethod(knockoutElement, dataElement); }
                else if(knockoutElement.mergeRule)
                {
                    var mergeMethod = getMethodForMergeRule(knockoutElement.mergeRule);
                    if(mergeMethod) { mergeMethod(knockoutElement, dataElement); }
                }
                else
                { knockoutElement(dataElement); }
            }
        }
        else
        {
            if(knockoutElement.replaceOnMerge)
            { knockoutElement.removeAll(); }

            dataElement.forEach(function(element) {
                var arrayElement = new knockoutElement.mergeConstructor();
                exports.fromJS(arrayElement, element);
                knockoutElement.push(arrayElement);
            });
        }
    };

    var getMethodForMergeRule = function(mergeRule) {
        for(var property in exports.rules)
        {
            if(property.toLowerCase() == mergeRule.toLowerCase())
            { return exports.rules[property]; }
        }
    };

    exports.fromJS = function (koModel, data) {
        for (var parameter in data)
        {
            if (typeof (koModel[parameter]) == "object")
            { exports.fromJS(koModel[parameter], data[parameter]); }
            else if (typeof (koModel[parameter]) == "function")
            { knockoutElementMapping(koModel[parameter], data[parameter]); }
            else if(typeof(koModel[parameter]) != "undefined")
            { koModel[parameter] = data[parameter]; }
        }
    }

    ko.observableArray.fn.withMergeConstructor = function(mergeConstructor, replaceOnMerge) {
        this.mergeConstructor = mergeConstructor;

        if(replaceOnMerge)
        { this.replaceOnMerge = replaceOnMerge; }

        return this;
    }

    ko.observable.fn.withMergeMethod = function(method) {
        this.mergeMethod = method;
        return this;
    }

    ko.observable.fn.withMergeRule = function(rule) {
        this.mergeRule = rule;
        return this;
    }

    exports.rules = [];

}));