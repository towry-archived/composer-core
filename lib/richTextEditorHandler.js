
import keys from './util/keys';

/**
 * object that hold the handlers
 */
let richTextEditorHandler = {
  onKeyDown (e) {
    let editorState = this.props.editorState;
    let which = e.which;

    switch (which) {
    case keys.RETURN:
      e.preventDefault();
      if (!this.props.handleReturn || !this.props.handleReturn()) {
        // default
        splitBlock(editorState);
      }
      break;
    default:
      break;
    }
  }
};

export default richTextEditorHandler;
