
/**
 * Get the offset key from the ancestor of the node.
 * @param {object} node 
 */
function getAncestorOffsetKey (node) {
  let nodeTemp = node;
  while (nodeTemp) {
    if (nodeTemp.nodeType !== 1) {
      nodeTemp = nodeTemp.parentNode;
      continue;
    }

    if (nodeTemp.hasAttribute('data-offset')) {
      return nodeTemp.getAttribute('data-offset');
    }
    if (nodeTemp.hasAttribute('data-block')) {
      return null;
    }

    nodeTemp = nodeTemp.parentNode;
  }
  return null;
}

export default getAncestorOffsetKey;
