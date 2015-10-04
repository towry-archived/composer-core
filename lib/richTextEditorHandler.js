
/**
 * object that holder the handlers
 */
let richTextEditorHandler = {
  onKeyDown (e) {
    switch (e.which) {
    case 13:
      e.preventDefault();
      console.log('enter');
      break;
    default:
      break;
    }
  }
};

export default richTextEditorHandler;
