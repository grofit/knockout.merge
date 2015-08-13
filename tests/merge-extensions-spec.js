describe("Merge extensions", function() {

	it("should correctly use merge rules", function() {
		ko.merge.rules["test"] = function(knockoutElement, dataElement) {
			knockoutElement(dataElement * 2);
		};

		var vm = {
			value1: ko.observable(10).withMergeRule("test")
		};

		var data = {
			value1: 100
		};

		ko.merge.fromJS(vm, data);

		expect(vm.value1()).toBe(200);
	});

	it("should correctly use merge constructor", function() {
		function Dummy() {
			this.value2 = ko.observable();
		}

		var vm = {
			value1: ko.observableArray([]).withMergeConstructor(Dummy)
		};

		var data = {
			value1: [
				{value2: 10},
				{value2: 20},
				{value2: 30}
			]
		};

		ko.merge.fromJS(vm, data);

		expect(vm.value1().length).toBe(3);
		expect(vm.value1()[0].value2()).toBe(10);
		expect(vm.value1()[1].value2()).toBe(20);
		expect(vm.value1()[2].value2()).toBe(30);
	});

	it("should correctly use merge method", function() {

		var vm = {
			value1: ko.observable(10).withMergeMethod(function(knockoutElement, dataElement){
				knockoutElement(dataElement * 2);
			})
		};

		var data = {
			value1: 6
		};

		ko.merge.fromJS(vm, data);

		expect(vm.value1()).toBe(12);
	});

});