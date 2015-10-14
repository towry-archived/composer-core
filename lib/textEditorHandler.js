
import keys from './util/keys';
import getSelection from './dom/getSelection';
import EditorState from './EditorState';

/**
 * object that hold the handlers
 */
let textEditorHandler = {
  onKeyDown (e) {
    let editorState = this.props.editorState;
    let which = e.which;

    switch (which) {
    case keys.RETURN:
      e.preventDefault();
      // TODO
      if (!this.props.handleReturn || !this.props.handleReturn()) {
        this.update(splitBlocks(editorState));
      }
      break;
    default:
      break;
    }
  },

  onBeforeInput () {
    console.log('onBeforeInput');
  }, 

  onInput () {
    console.log('onInput');
  },

  onBlur () {
    // remove all ranges when blur on webkit browser.
    if (window.navigator.userAgent.toLowerCase().match(/chrome|applewebkit/).length) {
      if (getActiveElement() === document.body) {
        document.getSelection().removeAllRanges();
      }
    }

    let editorState = this.props.editorState;
    let selection = editorState.getSelection();
    if (!selection.getHasFocus()) {
      return;
    }
    let updatedSelection = selection.set('hasFocus', false);
    this.update(EditorState.acceptSelection(editorState, updatedSelection));
  },

  onFocus () {
    let editorState = this.props.editorState;
    let selection = editorState.getSelection();
    if (selection.getHasFocus()) {
      return;
    }
    let updatedSelection = selection.set('hasFocus', true);
    this.update(EditorState.acceptSelection(editorState, updatedSelection));
  },

  onSelect () {
    const editorState = this.props.editorState;
    let selection = getSelection(editorState);
    if (selection !== editorState.getSelection()) {
      this.update(EditorState.acceptSelection(editorState, selection));
    }
  }
};

export default textEditorHandler;

// Get current active element
function getActiveElement () {
  try {
    return document.activeElement || document.body;
  } catch (e) {
    return document.body;
  }
}

/**
 * split block when user press enter key
 * @param {object} editorState
 */
function splitBlocks (editorState) {
  return editorState;
}
