describe("Basic Merge Tests", function() {
  
  it("should correctly update properties in view model", function() {
    var vm = {
		name: ko.observable("Joe"),
		age: ko.observable(20)
	}
	
	var data = {
		name: "Jack",
		age: 45
	}
	
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
	}
	
	var data = {
		person: {
			name: "Jack",
			age: 45
		}
	}
	
	ko.merge.fromJS(vm, data);
	
	expect(vm.person.name()).toBe("Jack");
	expect(vm.person.age()).toBe(45);
  });
  
});