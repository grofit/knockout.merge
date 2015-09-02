describe("Basic Merge Tests", function() {
  
  it("should correctly update properties in view model", function() {
    var vm = {
		name: ko.observable("Joe"),
		age: ko.observable(20)
	};
	
	var data = {
		name: "Jack",
		age: 45
	};
	
	ko.merge.fromJS(vm, data);
	
	expect(vm.name()).toBe("Jack");
	expect(vm.age()).toBe(45);
  });
  
    it("should correctly update nested properties in view model", function() {
    var vm = {
		person: {
			name: ko.observable("Joe"),
			age: ko.observable(20)
		}
	};
	
	var data = {
		person: {
			name: "Jack",
			age: 45
		}
	};
	
	ko.merge.fromJS(vm, data);
	
	expect(vm.person.name()).toBe("Jack");
	expect(vm.person.age()).toBe(45);
  });

	it("should correctly merge json objects", function() {

		var vm = {
			value1: 10,
			jsonObject: {}
		};

		var data = {
			jsonObject: {
				test: "hello",
				woop: "woop"
			}
		};

		ko.merge.fromJS(vm, data);

		expect(vm.jsonObject.test).toBe("hello");
		expect(vm.jsonObject.woop).toBe("woop");
	});

	it("should merge json objects as observable with option", function() {

		var vm = {
			value1: 10,
			jsonObject: {}
		};

		var data = {
			jsonObject: {
				test: "hello",
				woop: "woop"
			}
		};

		ko.merge.fromJS(vm, data, { mergeMissingAsObservables: true });

		expect(ko.isObservable(vm.jsonObject.test)).toBe(true);
		expect(vm.jsonObject.test()).toBe("hello");
		expect(ko.isObservable(vm.jsonObject.woop)).toBe(true);
		expect(vm.jsonObject.woop()).toBe("woop");
	});

	it("should ONLY merge json objects if it exists in knockout model first", function() {

		var vm = {
			value1: 10
		};

		var data = {
			jsonObject: {
				test: "hello",
				woop: "woop"
			}
		};

		ko.merge.fromJS(vm, data);

		expect(vm.jsonObject).toBeUndefined();
	});
	
	it("should correctly update properties that have a starting value of null", function(){
		var vm= {
			value1: null
		};
		
		var data = {
			value1: 10
		};
		
		ko.merge.fromJS(vm, data);
		
		expect(vm.value1).toBe(10);
	})
  
});
