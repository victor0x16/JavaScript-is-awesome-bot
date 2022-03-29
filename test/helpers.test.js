const chai = require("chai");
const expect = chai.expect;
const { toString } = require("../helpers/helpers");

describe("Helpers functions", function () {
	it("toString", function () {
		expect(toString("1")).equals("1");
		expect(toString({a:"a"})).equals("[object Object]");
		expect(toString(7777)).equals("7777");
	});
});


