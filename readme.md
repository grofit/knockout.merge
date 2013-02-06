# Knockout.Mapping.Merge

A simple addition to to the ko.mapping namespace to allow merging data into an existing object.

I was finding working with models which exposed bindings in a nested nature would not cope well with 
dynamic json data. It was either use the mapping plugin to generate the model which removed the ability
to use computed observables without attaching them to the instance or manually writing the mapping logic
to map data against a given model.

So this simple plugin was designed to take the effort out of working with external data sources which use 
some form of model as a contract. It will auto merge any data into the bindings without destroying or replacing
any of the underlying objects functions. It works fine with nested objects and complex arrays, just make 
sure that the names of the json keys match the binding names.

## Example

A simple example of merging some Json data into an existing model:
```
function User() {
    var self = this;
    
    self.Firstname = ko.observable();
    self.Surname = ko.observable();
    
    self.Fullname = ko.computed(function() {
        return self.Firstname() + " " + self.Surname();
    });
}

var someJson = {
	Firstname = "James",
	Surname = "Bond"
};

var someUser = new User();
ko.mapping.mergeFromJS(someUser, someJson);

// Will output "James"
alert(someUser.Firstname());
```