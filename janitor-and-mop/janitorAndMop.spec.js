const expect = require('chai').expect;
const { createMapOfCharacterOccurances, calculateDistanceBtwnIdxs, outputBrushWidthAtCorrespondingAlphabetLocation, theJanitor, createEmptyCharMap } = require('./janitorAndMop')

describe("#createEmtpyCharMap() -- creates on object with a key for each unique letter. the value of each key is an empty array ", () => {

  it("createEmtpyCharMap test case 01", () => {
    const testInput = ["l", "o", "l"]
    const output = createEmptyCharMap(testInput)
    expect(output).to.eql({ l: [], o: [] })
  })

  it("createEmtpyCharMap test case 02", () => {
    const testInput = "oogabooga".split(""); // will be ['o','g','a','b'] 
    const output = createEmptyCharMap(testInput)
    expect(output).to.eql({ o: [], g: [], a: [], b: [] })
  })

})


describe('#createMapOfCharacterOccurances() -- records the first and last occurance of each character. Each key in the object should have a an array value where index 0 is first occurance and index 1 is 2nd occurance', () => {

  it('createMapOfCharacterOccurances -- test case 01', function () {
    const characterMapSkeleton = { o: [], g: [], a: [], b: [] };// 1st argument
    const inputArray = "oogabooga".split("");// 2nd argument
    const output = createMapOfCharacterOccurances(characterMapSkeleton, inputArray);
    expect(output).to.eql({ o: [0, 6], g: [2, 7], a: [3, 8], b: [4] })
  });

  it('createMapOfCharacterOccurances -- test case 02', () => {
    const output2 = createMapOfCharacterOccurances(
      { s: [], h: [], a: [], q: [], u: [], i: [], e: [], l: [], o: [], n: [] }, // first arg
      "shaquielleoneal".split("") // 2nd arg
    )
    expect(output2).to.eql(
      { s: [0], h: [1], a: [2, 13], q: [3], u: [4], i: [5], e: [6, 12], l: [7, 14], o: [10], n: [11] }
    )
  })

})


describe("#calculatesDistanceBtwnIdxs() -- calculates distances between char occurances", () => {

  it("calculateDistancesBtwnIdxs -- test case 01", (() => {
    // test case input = "lol"
    const output = calculateDistanceBtwnIdxs({ l: [0, 2], o: [1] })
    expect(output).to.eql({ l: 3, o: 1 });
  }))

  it("calculateDistancesBtwnIdxs -- test case 02", (() => {
    // test case input = "oogabooga"
    const output = calculateDistanceBtwnIdxs({ o: [0, 6], g: [2, 7], a: [3, 8], b: [4] })
    // the distance between 0 and 6 = 7, 2 and 7 = 6, etc....
    // if there is no second occurance of a char then the distance = 1
    expect(output).to.eql({ o: 7, g: 6, a: 6, b: 1 });
  }))

})

describe("#outputBrushWidthAtCorrespondingAlphabetLocation() -- puts the brush width answer at the proper location in an array where each index represents a letter of the alphabet", () => {
  it("outputBrushWidthAtCorrespondingAlphabetLocation -- test case 02", (() => {
    // test case = "lol"
    const output = outputBrushWidthAtCorrespondingAlphabetLocation({ l: 3, o: 1 })
    expect(output).to.eql([
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 3 /* BRUSH WIDTH FOR "l" IS 3  */, 0, 0, 1 /* BRUSH WIDTH FOR "o" IS 1  */, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0
    ])

  }))
  it("outputBrushWidthAtCorrespondingAlphabetLocation -- test case 02", (() => {
    // test case = "oogabooga"
    const output = outputBrushWidthAtCorrespondingAlphabetLocation({ o: 7, g: 6, a: 6, b: 1 })
    expect(output).to.eql([
      6, 1, 0, 0, 0, 0, 6, 0,
      0, 0, 0, 0, 0, 0, 7, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0
    ])
  }))
})


it("works end to end", () => {
  const output = theJanitor("helloworld")
  expect(output).to.eql([
    0, 0, 0, 1, 1, 0, 0, 1,
    0, 0, 0, 7, 0, 0, 3, 0,
    0, 1, 0, 0, 0, 0, 1, 0,
    0, 0
  ])
})


