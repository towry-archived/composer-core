/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * @author Towry Wang
 */

import React, { Component } from 'react';
import Composer from '../lib/components/Composer';
import DataAdapter from '../lib/DataAdapter';
import EditorState from '../lib/EditorState';

class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Composer {...this.props} />
    );
  }
}

App.init = function () {
  let adapter = new DataAdapter();

  $.get('/sandbox/data.json', function (d) {
    adapter.setData(d);
    let editorState = EditorState.create(adapter.getBlocks());
    window.$s = editorState;
    React.render(<App editorState={editorState} />, document.body);
  });
}


App.init();
