describe("Array Merge", function() {

	it("should correctly merge complex objects", function() {
		var vm = { values: ko.observableArray() };
		vm.values.push({ id: 1, value: 1 });
		vm.values.push({ id: 2, value: 2 });
		vm.values.push({ id: 3, value: 3 });

		var data = {
			values: [{ id: 1, value: 4 },
				{ id: 2, value: 5 },
				{ id: 3, value: 6 }]
		};
		ko.merge.fromJS(vm, data);

		expect(vm.values().length).toBe(3);
		expect(vm.values()[0].value).toBe(4);
		expect(vm.values()[1].value).toBe(5);
		expect(vm.values()[2].value).toBe(6);
	});

	it("should correctly merge complex observable objects", function() {
		var vm = { values: ko.observableArray() };
		vm.values.push({ id: ko.observable(1), value: ko.observable(1) });
		vm.values.push({ id: ko.observable(2), value: ko.observable(2) });
		vm.values.push({ id: ko.observable(3), value: ko.observable(3) });

		var data = {
			values: [{ id: 1, value: 4 },
				{ id: 2, value: 5 },
				{ id: 3, value: 6 }]
		};
		ko.merge.fromJS(vm, data);

		// Ensure objects are still observable
		expect(ko.isObservable(vm.values()[0].id)).toBe(true);
		expect(ko.isObservable(vm.values()[0].value)).toBe(true);
		expect(ko.isObservable(vm.values()[1].id)).toBe(true);
		expect(ko.isObservable(vm.values()[1].value)).toBe(true);
		expect(ko.isObservable(vm.values()[2].id)).toBe(true);
		expect(ko.isObservable(vm.values()[2].value)).toBe(true);

		expect(vm.values().length).toBe(3);
		expect(vm.values()[0].value()).toBe(4);
		expect(vm.values()[1].value()).toBe(5);
		expect(vm.values()[2].value()).toBe(6);
	});

	it("should correctly merge numbers", function() {
		var vm = { values: ko.observableArray([1, 2, 3]) };
		var data = { values: [4, 5, 6] };
		ko.merge.fromJS(vm, data);

		expect(vm.values().length).toBe(3);
		expect(vm.values()[0]).toBe(4);
		expect(vm.values()[1]).toBe(5);
		expect(vm.values()[2]).toBe(6);
	});

	it("should correctly merge strings", function() {
		var vm = { values: ko.observableArray(["a", "b", "c"]) };
		var data = { values: ["A", "B", "C"] };
		ko.merge.fromJS(vm, data);

		expect(vm.values().length).toBe(3);
		expect(vm.values()[0]).toBe("A");
		expect(vm.values()[1]).toBe("B");
		expect(vm.values()[2]).toBe("C");
	});

	it("should correctly merge booleans", function() {
		var vm = { values: ko.observableArray([true, false, true]) };
		var data = { values: [false, true, false] };
		ko.merge.fromJS(vm, data);

		expect(vm.values().length).toBe(3);
		expect(vm.values()[0]).toBe(false);
		expect(vm.values()[1]).toBe(true);
		expect(vm.values()[2]).toBe(false);
	});

	it("should correctly merge dates", function() {
		var vm = { values: ko.observableArray([new Date(2013,11, 25), new Date(2014,11, 25), new Date(2015,11, 25)]) };
		var data = { values: [new Date(2013,11, 24), new Date(2014,11, 24), new Date(2015,11, 24)]};
		ko.merge.fromJS(vm, data);

		expect(vm.values().length).toBe(3);
		expect(vm.values()[0].getTime()).toBe(new Date(2013,11, 24).getTime());
		expect(vm.values()[1].getTime()).toBe(new Date(2014,11, 24).getTime());
		expect(vm.values()[2].getTime()).toBe(new Date(2015,11, 24).getTime());
	});

	it("should correctly merge nulls", function() {
		var vm = { values: ko.observableArray(["a", false, new Date()]) };
		var data = { values: [null, true, null] };
		ko.merge.fromJS(vm, data);

		expect(vm.values().length).toBe(3);
		expect(vm.values()[0]).toBe(null);
		expect(vm.values()[1]).toBe(true);
		expect(vm.values()[2]).toBe(null);
	});

	it("should correctly merge undefined", function() {
		var vm = { values: ko.observableArray(["a", false, new Date()]) };
		var data = { values: [undefined, true, undefined] };
		ko.merge.fromJS(vm, data);

		expect(vm.values().length).toBe(3);
		expect(vm.values()[0]).toBe(undefined);
		expect(vm.values()[1]).toBe(true);
		expect(vm.values()[2]).toBe(undefined);
	});

	it("should correctly leave any extra items", function() {
		var vm = { values: ko.observableArray(["a", "b", "c", "d"]) };
		var data = { values: ["A", "B", "C"] };
		ko.merge.fromJS(vm, data);

		expect(vm.values().length).toBe(4);
		expect(vm.values()[0]).toBe("A");
		expect(vm.values()[1]).toBe("B");
		expect(vm.values()[2]).toBe("C");
		expect(vm.values()[3]).toBe("d");
	});

	it("should correctly add new items", function() {
		var vm = { values: ko.observableArray(["a", "b", "c"]) };
		var data = { values: ["A", "B", "C", "D"] };
		ko.merge.fromJS(vm, data);

		expect(vm.values().length).toBe(4);
		expect(vm.values()[0]).toBe("A");
		expect(vm.values()[1]).toBe("B");
		expect(vm.values()[2]).toBe("C");
		expect(vm.values()[3]).toBe("D");
	});

});