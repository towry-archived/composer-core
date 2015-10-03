import React, { Component } from 'react';
import EditorState from './EditorState';
import ass from './util/ass';
import richTextEditorHandler from './richTextEditorHandler';

export default class Editor extends Component {
  constructor (props) {
    super(props);

    // keyboard handler
    this._handler = null; 
  }

  componentDidMount () {
    this._handler = richTextEditorHandler;
  }

  getDefaultAttrs () {
    return {
      contentEditable: true,
      spellCheck: true,
      style: {
        outline: 'none'
      },

      onKeyDown: setHandler('onKeyDown', this)
    }
  }

  render () {
    let blocks = [{text: 'hhhh'}];
    
    return (
      <div {...this.getDefaultAttrs()} className={ass('composer')}>
        {
          blocks.map(function (block, i) {
            return <p key={i}>{block.text}</p>
          }.bind(this))
        }
      </div>
    );
  }
}

Editor.propTypes = {
  editorState: React.PropTypes.instanceOf(EditorState).isRequired
}

function setHandler (name, context) {
  return function (e) {
    if (this._handler && this._handler[name]) {
      let handler = this._handler[name];
      if (typeof handler === 'function') {
        handler.call(this, e);
      }
    }
  }.bind(context || this);
}
