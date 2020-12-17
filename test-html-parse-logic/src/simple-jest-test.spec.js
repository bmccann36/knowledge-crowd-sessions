const sum = require("./simple-jest-test");

test("adder", () => {
  expect(sum(1, 2)).toBe(3);
});


