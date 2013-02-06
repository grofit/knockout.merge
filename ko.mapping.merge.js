ko.mapping.mergeFromJS = function (koModel, data) {
	for (var parameter in  data) {
		if ( typeof(koModelparameter]) == "object" ) 
		{ ko.mapping.mergeFromJS(koModel[parameter],  data[parameter]); } 
		else 
		{
			if( typeof(koModel[parameter]) == "function") 
			{ koModel[parameter](data[parameter]); }
		}
	}
}