import React, { Component } from 'react';
import EditorState from '../EditorState';
import Editor from './Editor';

export default class Composer extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Editor {...this.props} />
      </div>
    );
  }
}

Composer.propTypes = {
  editorState: React.PropTypes.instanceOf(EditorState).isRequired
};
