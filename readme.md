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

This can be used in nodejs by using `npm install knockout.mapping.merge`, then just require it after knockout
and it will extend the object internally.

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
	Firstname: "James",
	Surname: "Bond"
};

var someUser = new User();
ko.mapping.mergeFromJS(someUser, someJson);

// Will output "James Bond"
alert(someUser.Fullname());
```

This should also solve the problem when using Knockout Validation, as the model remains intact so you 
can map from json or complex objects without worrying about losing your bindings:

```
function User() {
    var self = this;
    
	self.Age = ko.observable().extend({ digits: true });
    self.Firstname = ko.observable().extend({ maxLength: 20 });
    self.Surname = ko.observable().extend({ maxLength: 20 });
    
    self.Fullname = ko.computed(function() {
        return self.Firstname() + " " + self.Surname();
    });
}

var someJson = {
	Firstname: "James",
	Surname: "Bond",
	Age: 40
};

var someUser = new User();
ko.mapping.mergeFromJS(someUser, someJson);

```

There is also an option to infer the types for observable arrays so you can just auto-merge array elements into 
your observables, however this functionality will not be able to distinguish between existing elements and new elements
so this will currently just append elements to the array not merge them.

You can do this like this:

```
function SomeChildModel()
{
   this.Name = ko.observable();
}

function SomeModel()
{
   this.someArray = ko.observableArray().withMergeConstructor(SomeChildModel);
}
```

There has been some new additions to allow you to write custom merging logic, this is useful for certain
situations such as mapping date strings to date objects, or do anything more complicated than a simple data replacement. 
You can either do this by embedding your own method into the merging logic such as:

```
function SomeModel()
{
	this.Date = ko.observable(new Date()).mergeWithMethod(function(knockoutElement, dataElement) {
		knockoutElement(new Date(dataElement));
	});
}
```

Personally I am not a massive fan of this as you will rarely want to embed your mapping logic into your pojo models, so
if you want to use more of an AOP style approach and have your logic elsewhere then use the merging rules style settings:

```
// This can go anywhere, just make sure you include the required libs first 
ko.mapping.mergeRules["Date"] = function(knockoutElement, dataElement) {
	knockoutElement(new Date(dataElement));
};

function SomeModel()
{
	this.Date = ko.observable(new Date()).mergeWithRule("Date");
}
```

Finally there is also a typescript descriptor file available in the source folder to give you compile time safety.

Here is an example of what it does and how to use it, but you will need to check out the source code.
[View Example](https://rawgithub.com/grofit/knockout.mapping.merge/master/example.html)
