const sum = require('./simple-jest-test');

xtest('adder', () => {
  expect(sum(1, 2)).toBe(3);
});
