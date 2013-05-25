ko.mapping.mergeFromJS = function (koModel, data) {
    debugger;
    for (var parameter in data) {
        if (typeof (koModel[parameter]) == "object")
        { ko.mapping.mergeFromJS(koModel[parameter], data[parameter]); }
        else {
            if (typeof (koModel[parameter]) == "function") {
                if (!ko.isComputed(koModel[parameter])) {
                    koModel[parameter](data[parameter]);
                }
            }
        }
    }
}