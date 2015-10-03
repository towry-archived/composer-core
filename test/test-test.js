
describe('testTheTest', () => {
  it('should work if the test work', () => {
    expect(2).toEqual(2);
  })

  // skip it.
  xit('should fail if the test work', () => {
    expect(2).toEqual(3);
  })
})
