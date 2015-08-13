describe("Global handlers", function() {

	it("should only use global handlers when returning true", function() {
		var testHandler = function(knockoutElement, dataElement) {
			if(knockoutElement() == "WILL BE REPLACED") {
				knockoutElement(123);
				return true;
			}
			return false;
		};

		ko.merge.globalHandlers.push(testHandler);

		var vm = {
			value1: ko.observable("WILL BE REPLACED"),
			value2: ko.observable(10)
		};

		var data = {
			value1: "guff",
			value2: 200
		};

		ko.merge.fromJS(vm, data);

		expect(vm.value1()).toBe(123);
		expect(vm.value2()).toBe(200);
	});

});