describe("Knockout ES5 Merge", function() {

	it("should correctly merge objects", function() {
		var vm = {
			value1: 1,
			value2: 2
		};

		var data = {
			value1: 100,
			value2: 200
		};

		ko.track(vm);
		ko.merge.fromJS(vm, data);

		expect(vm.value1).toBe(100);
		expect(vm.value2).toBe(200);
	});

	it("should correctly use merge rules", function() {
		ko.merge.rules["test"] = function(knockoutElement, dataElement) {
			knockoutElement(dataElement * 2);
		};

		var vm = {
			value1: 10
		};

		var data = {
			value1: 100
		};

		ko.track(vm);
		ko.getObservable(vm, "value1").withMergeRule("test");
		ko.merge.fromJS(vm, data);

		expect(vm.value1).toBe(200);
	});

	it("should correctly use merge constructor", function() {
		function Dummy() {
			this.value2 = 0;
		}

		var vm = {
			value1: []
		};

		var data = {
			value1: [
				{value2: 10},
				{value2: 20},
				{value2: 30}
			]
		};

		ko.track(vm);
		ko.getObservable(vm, "value1").withMergeConstructor(Dummy);
		ko.merge.fromJS(vm, data);

		expect(vm.value1.length).toBe(3);
		expect(vm.value1[0].value2).toBe(10);
		expect(vm.value1[1].value2).toBe(20);
		expect(vm.value1[2].value2).toBe(30);
	});

	it("should correctly use merge method", function() {

		var vm = {
			value1: 10
		};

		var data = {
			value1: 6
		};

		ko.track(vm);
		ko.getObservable(vm, "value1").withMergeMethod(function(knockoutElement, dataElement){
			knockoutElement(dataElement * 2);
		});
		ko.merge.fromJS(vm, data);

		expect(vm.value1).toBe(12);
	});

});