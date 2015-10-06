import TreeMap from '../lib/TreeMap';
import BlockMap from '../lib/BlockMap';
import DataAdapter from '../lib/DataAdapter';

describe('Test TreeMap =>', () => {
  let blocks;
  let treeMap;
  let blockMap;
  let adapter;

  beforeEach(() => {
    blocks = [
      "Hello World",
      "Nice work"
    ];

    adapter = new DataAdapter();
    adapter.setData({blocks});

    blockMap = BlockMap.create(adapter);
    treeMap = TreeMap.createFromBlockMap(blockMap);
  })

  it('`create` should work', () => {
    expect(treeMap.getImmutable().first().first().get('leafs').size).toEqual(1);
    expect(treeMap.getImmutable().last().first().get('leafs').size).toEqual(1);
    expect(treeMap.getImmutable().first().first().get('leafs').first().get('start')).toEqual(0);
    expect(treeMap.getImmutable().first().first().get('leafs').first().get('end')).toEqual(blocks[0].length); 
  })

  xit('`set` should work', () => {
    // let key = blockMap.getImmutable().first().get('key');
  })
})
