(function(knockout){
	knockout.mapping.mergeFromJS = function (koModel, data) {
		//debugger;
		for (var parameter in data) 
		{
			if (typeof (koModel[parameter]) == "object")
			{ 
				if(typeof(koModel[parameter].mergeConstructor) == "undefined")
				{ knockout.mapping.mergeFromJS(koModel[parameter], data[parameter]); }
				else
				{
					koModel[parameter].forEach(function(element) {
						var arrayElement = new koModel[parameter].mergeConstructor();
						knockout.mapping.mergeFromJS(arrayElement, element);
						koModel[parameter].push(arrayElement);
					});			
				}
			}
			else 
			{
				if (typeof (koModel[parameter]) == "function") 
				{
					if (!knockout.isComputed(koModel[parameter])) 
					{ koModel[parameter](data[parameter]); }
				}
			}
		}
	}

	knockout.observableArray.fn.withMergeConstructor = function(mergeConstructor) {
		this.mergeConstructor = mergeConstructor;
		return this;
	}
})(typeof exports === 'undefined'? this['ko'] : require("knockout"));


