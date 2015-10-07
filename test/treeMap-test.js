import TreeMap from '../lib/TreeMap';
import BlockMap from '../lib/BlockMap';
import DataAdapter from '../lib/DataAdapter';

describe('Test TreeMap =>', () => {
  let blocks;
  let treeMap;
  let blockMap;
  let adapter;
  let key;
  let tree;

  beforeEach(() => {
    blocks = [
      "Hello World",
      "Nice work"
    ];

    adapter = new DataAdapter();
    adapter.setData({blocks});

    blockMap = BlockMap.create(adapter);
    treeMap = TreeMap.createFromBlockMap(blockMap);
    key = blockMap.getImmutable().first().get('key');
    tree = treeMap.get(key);
  })

  it('`create` should work', () => {
    expect(treeMap.getImmutable().first().first().get('leafs').size).toEqual(1);
    expect(treeMap.getImmutable().last().first().get('leafs').size).toEqual(1);
    expect(treeMap.getImmutable().first().first().get('leafs').first().get('start')).toEqual(0);
    expect(treeMap.getImmutable().first().first().get('leafs').first().get('end')).toEqual(blocks[0].length); 
  })

  it('get item should work', () => {
    expect(Object.prototype.toString.call(tree.toJS())).toBe("[object Array]");
    // tree is a object [{leafs: {}}, {leafs: {}}]
    expect(tree.getIn([0, 'leafs'])).not.toBe(undefined);
  })

  it('`set` should work', () => {
    expect(key).not.toBe(undefined);

    let start = tree.getIn([0, 'leafs', 0, 'start']);
    expect(start).toBe(0);

    let dup = tree.setIn([0, 'leafs', 0, 'start'], 2);
    expect(dup.getIn([0, 'leafs', 0, 'start'])).toBe(2);
  })
})
