
import SelectionState from '../SelectionState';
import getAncestorOffsetKey from './getAncestorOffsetKey';
import offsetKey from '../util/offsetKey';

// https://developer.mozilla.org/en-US/docs/Web/API/Selection

/**
 * Get updated selection
 * @param {EditorState} editorState
 */
function getSelection (editorState) {
  let selectState = editorState.getSelection();
  let selection = document.getSelection();
  let anchorNode = selection.anchorNode;
  let anchorOffset = selection.anchorOffset;
  let focusNode = selection.focusNode;
  let focusOffset = selection.focusOffset;

  let anchorOffsetKeyStr = getAncestorOffsetKey(anchorNode);
  let focusOffsetKeyStr = getAncestorOffsetKey(focusNode);
  let anchorOffsetKey = offsetKey.decode(anchorOffsetKeyStr);
  let focusOffsetKey = offsetKey.decode(focusOffsetKeyStr);
  let isBackward = isBackwardFn(anchorOffsetKey.blockKey, focusOffsetKey.blockKey, anchorOffset, focusOffset, editorState);

  let updatedSelectState = new SelectionState({
    anchorKey: anchorOffsetKey.blockKey,
    focusKey: focusOffsetKey.blockKey,
    anchorOffset: anchorOffset,
    focusOffset: focusOffset,
    isBackward: isBackward
  });

  if (selectState.equals(updatedSelectState)) {
    return selectState;
  }

  return updatedSelectState;
}

export default getSelection;

/**
 * Check if the selection is backward
 * @param {string} anchorKey
 * @param {string} focusKey
 * @param {number} anchorOffset 
 * @param {number} focusOffset
 * @param {EditorState} editorState
 */
function isBackwardFn (anchorKey, focusKey, anchorOffset, focusOffset, editorState) {
  if (anchorKey === focusKey && anchorOffset === focusOffset) {
    return false;
  }
  if (anchorKey === focusKey) {
    if (focusOffset > anchorOffset) {
      return false;
    } 
    return true;
  }

  // otherwise check if focuskey is before anchorKey
  let blocks = editorState.getBlockMap().getImmutable();
  let tarKey = blocks.keySeq().skipUntil(key => {
    return key === anchorKey || key === focusKey;
  }).first();

  // first met key is anchorKey
  if (tarKey === anchorKey) {
    return false;
  } 

  return true;
}
