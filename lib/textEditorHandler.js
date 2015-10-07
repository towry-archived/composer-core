
import keys from './util/keys';

/**
 * object that hold the handlers
 */
let textEditorHandler = {
  onKeyDown (e) {
    // let editorState = this.props.editorState;
    let which = e.which;

    switch (which) {
    case keys.RETURN:
      e.preventDefault();
      if (!this.props.handleReturn || !this.props.handleReturn()) {
        // default
      }
      break;
    default:
      break;
    }
  },

  onBeforeInput () {
    console.log('e');
  }, 

  onInput () {
    let se = document.getSelection();
    console.log(se);
  },

  onBlur () {
    console.log('onBlur');
  }
};

export default textEditorHandler;

