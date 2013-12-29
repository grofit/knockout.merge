(function(knockout){

    var knockoutElementMapping = function(knockoutElement, dataElement)
    {
        if(typeof(knockoutElement.mergeConstructor) == "undefined")
        {
            if (!knockout.isComputed(knockoutElement))
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
                knockout.mapping.mergeFromJS(arrayElement, element);
                knockoutElement.push(arrayElement);
            });
        }
    };

    var getMethodForMergeRule = function(mergeRule) {
        for(var property in knockout.mapping.mergeRules)
        {
            if(property.toLowerCase() == mergeRule.toLowerCase())
            { return knockout.mapping.mergeRules[property]; }
        }
    };

    knockout.mapping.mergeFromJS = function (koModel, data) {
        //debugger;
        for (var parameter in data)
        {
            if (typeof (koModel[parameter]) == "object")
            { knockout.mapping.mergeFromJS(koModel[parameter], data[parameter]); }
            else if (typeof (koModel[parameter]) == "function")
            { knockoutElementMapping(koModel[parameter], data[parameter]); }
            else if(typeof(koModel[parameter]) != "undefined")
            { koModel[parameter] = data[parameter]; }
        }
    }

    knockout.observableArray.fn.withMergeConstructor = function(mergeConstructor, replaceOnMerge) {
        this.mergeConstructor = mergeConstructor;

        if(replaceOnMerge)
        { this.replaceOnMerge = replaceOnMerge; }

        return this;
    }

    knockout.observable.fn.withMergeMethod = function(method) {
        this.mergeMethod = method;
        return this;
    }

    knockout.observable.fn.withMergeRule = function(rule) {
        this.mergeRule = rule;
        return this;
    }

    knockout.mapping.mergeRules = [];

})(typeof exports === 'undefined'? this['ko'] : require("knockout"));