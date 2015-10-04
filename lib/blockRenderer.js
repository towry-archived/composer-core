
import blockType from './blockType';
import ContentBlock from './components/ContentBlock';

/**
 * Determine which component should we use for render the
 * current block.
 *
 * @param {BlockState} block - The block has getType method
 * that return a type of blockType.
 */
export default function blockRenderer (block) {
  const type = block.getType();

  switch (type) {
  case blockType.MEDIA:
    // not supported
    return null;
  default:
    return ContentBlock;
  }
}

export function getParentElementForBlockOfType (type) {
  switch (type) {
  case blockType.UNORDERED_LIST_ITEM:
    return 'ul';
  case blockType.ORDERED_LIST_ITEM:
    return 'ol';
  case blockType.CODE:
    return 'pre';
  default:
    return null;
  }
}

export function getElementForBlockOfType (type) {
  switch (type) {
  case blockType.UNORDERED_LIST_ITEM:
  case blockType.ORDERED_LIST_ITEM:
    return 'li';
  case blockType.HEADER_ONE:
    return 'h1';
  case blockType.HEADER_TWO:
    return 'h2';
  case blockType.BLOCKQUOTE:
    return 'blockquote';
  default: 
    return 'div';
  }
}
