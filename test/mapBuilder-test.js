import { createFromArray } from '../lib/treeMapBuilder';

describe('Test treeMapBuilder =>', () => {
  it('`createFromArray` should work', () => {
    let blocks = [
      { "text": "Hello World", "type": 2, "depth": 0 },
      { "text": "Nice work", "type": 2, "depth": 0}
    ];

    let treeMap = createFromArray(blocks);
    expect(treeMap.first().first().get('leafs').size).toEqual(1);
    expect(treeMap.last().first().get('leafs').size).toEqual(1);
    expect(treeMap.first().first().get('leafs').first().get('start')).toEqual(0);
    expect(treeMap.first().first().get('leafs').first().get('end')).toEqual(blocks[0].text.length);
  })
})
