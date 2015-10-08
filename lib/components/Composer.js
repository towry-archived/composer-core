import React, { Component } from 'react';
import EditorState from '../EditorState';
import Editor from './Editor';
import ass from '../util/ass';

export default class Composer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      editorState: this.props.editorState
    };
  }

  update (s) {
    if (this.state.editorState === s) {
      return;
    }

    this.setState({
      editorState: s
    });
  }

  render () {
    let editorState = this.state.editorState;
    window.$s = editorState;

    return (
      <div className={ass('composer')}>
        <Editor update={this.update.bind(this)} editorState={editorState} />
      </div>
    );
  }
}

Composer.propTypes = {
  editorState: React.PropTypes.instanceOf(EditorState).isRequired
};
