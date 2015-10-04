
function blockDecode (adapter) {
  const blocks = adapter.getBlocks();

  return blocks.map(function (block) {
    console.log(block);
  });
}

export default blockDecode;
