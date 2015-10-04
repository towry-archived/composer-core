
import React, { Component } from 'react';
import EditorState from '../EditorState';
import ass from '../util/ass';
import defaultBlockRenderer, { getParentElementForBlockOfType } from '../blockRenderer';

export default class EditorContent extends Component {
  constructor (props) {
    super(props);
  }

  _renderChild () {
    const editorState = this.props.editorState;
    const blockMap = editorState.getBlockMap();
    const blockMapAsArray = blockMap.toArray();
    const blockRenderer = this.props.blockRenderer;

    let renderedBlocks = [];
    let blockStateItem;
    let lastParentElement = null;
    let parentElement = null;
    let childsOfParentElement = null;

    for (let i = 0; i < blockMapAsArray.length; i++) {
      blockStateItem = blockMapAsArray[i];

      const key = blockStateItem.getKey();
      let tree = editorState.getBlockTreeForKey(key);
      let BlockComponent = blockRenderer(blockStateItem);

      // currently, just ignore it if we do not support that 
      // block type
      if (BlockComponent === null) {
        continue;
      }

      let renderedBlock = <BlockComponent block={blockStateItem} key={key} {...this.props} tree={tree} />;

      parentElement = getParentElementForBlockOfType(blockStateItem.getType());
      if (parentElement !== null) {
        if (parentElement === lastParentElement && childsOfParentElement !== null) {
          childsOfParentElement.push(renderedBlock);
        } else {
          childsOfParentElement = [];

          let renderedParent = React.createElement(parentElement, {
            'key': key + '-wrap'
          }, childsOfParentElement);

          renderedBlocks.push(renderedParent);

          lastParentElement = parentElement;
          parentElement = null;
        }
      } else {
        renderedBlocks.push(renderedBlock);
        childsOfParentElement = null;
        lastParentElement = null;
        parentElement = null;
      }
    }

    return renderedBlocks;
  }

  render () {
    return (
      <div className={ass('editorContent')}>
        {this._renderChild()}
      </div>
    );
  }
}

EditorContent.propTypes = {
  editorState: React.PropTypes.instanceOf(EditorState).isRequired,
  blockRenderer: React.PropTypes.func
};

EditorContent.defaultProps = {
  blockRenderer: defaultBlockRenderer
};
