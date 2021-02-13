# The Janitor and His Mop

this problem comes from here https://www.codewars.com/kata/59128363e5bc24091a00006f

1) make sure you CD into this directory `/janitor-and-mop`

1) `npm i`

1) `npm test`  will run all tests

### how do I run just some tests or one test ? 

```js
// add "only" to a desribe block to run only the tests inside that describe block
// this example would only run the two "it"s within it
describe.only("#createEmtpyCharMap() -- creates on object with a key for each unique letter. the value of each key is an empty array ", () => {
  it("test one", () => {
// some test
  })
  it("test two", () => {
// some test
  })
})
// add .only to the end of an "it" block to run just that test
  it.only("createEmtpyCharMap test case 01", () => {
     // .... some code
  })
```

for more on using mocha https://mochajs.org/#getting-started


