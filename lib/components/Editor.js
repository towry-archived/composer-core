import React, { Component } from 'react';
import EditorState from '../EditorState';
import ass from '../util/ass';
import textEditorHandler from '../textEditorHandler';
import EditorContent from './EditorContent';

export default class Editor extends Component {
  constructor (props) {
    super(props);

    // keyboard handler
    this._handler = null; 
  }

  componentDidMount () {
    this._handler = textEditorHandler;
  }

  getDefaultAttrs () {
    return {
      contentEditable: true,
      spellCheck: true,
      style: {
        outline: 'none'
      },

      onKeyDown: setHandler('onKeyDown', this),
      onBeforeInput: setHandler('onBeforeInput', this),
      onInput: setHandler('onInput', this),
      onBlur: setHandler('onBlur', this)
    };
  }

  render () {
    return (
      <div {...this.getDefaultAttrs()} className={ass('editor')}>
        <EditorContent editorState={this.props.editorState} />
      </div>
    );
  }
}

Editor.propTypes = {
  editorState: React.PropTypes.instanceOf(EditorState).isRequired
};

function setHandler (name, context) {
  return function (e) {
    if (this._handler && this._handler[name]) {
      const handler = this._handler[name];
      if (typeof handler === 'function') {
        handler.call(this, e);
      }
    }
  }.bind(context || this);
}
