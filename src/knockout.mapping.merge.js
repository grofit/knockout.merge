ko.mapping.mergeFromJS = function (koModel, data) {
    //debugger;
    for (var parameter in data) 
	{
        if (typeof (koModel[parameter]) == "object")
        { 
			if(typeof(koModel[parameter].mergeConstructor) == "undefined")
			{ ko.mapping.mergeFromJS(koModel[parameter], data[parameter]); }
			else
			{
				koModel[parameter].forEach(function(element) {
					var arrayElement = new koModel[parameter].mergeConstructor();
					ko.mapping.mergeFromJS(arrayElement, element);
					koModel[parameter].push(arrayElement);
				});			
			}
		}
        else 
		{
            if (typeof (koModel[parameter]) == "function") 
			{
                if (!ko.isComputed(koModel[parameter])) 
				{ koModel[parameter](data[parameter]); }
            }
        }
    }
}

ko.observableArray.fn.withMergeConstructor = function(mergeConstructor) {
	this.mergeConstructor = mergeConstructor;
	return this;
}