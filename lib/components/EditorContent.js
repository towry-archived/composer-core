import React, { Component } from 'react';
import EditorState from '../EditorState';

export default class EditorContent extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div></div>
    );
  }
}

EditorContent.propTypes = {
  editorState: React.PropTypes.instanceOf(EditorState).isRequired
};
