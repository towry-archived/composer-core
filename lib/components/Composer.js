import React, { Component } from 'react';
import EditorState from '../EditorState';
import Editor from './Editor';
import ass from '../util/ass';

export default class Composer extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className={ass('composer')}>
        <Editor {...this.props} />
      </div>
    );
  }
}

Composer.propTypes = {
  editorState: React.PropTypes.instanceOf(EditorState).isRequired
};
