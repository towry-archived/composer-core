
import React, { Component } from 'react';
import { getElementForBlockOfType } from '../blockRenderer';
import BlockLeaf from './BlockLeaf';

export default class ContentBlock extends Component {

  static displayName = 'ContentBlock';

  constructor (props) {
    super(props);
  }

  _renderChild () {
    const tree = this.props.tree;
    const block = this.props.block;
    const text = block.getText();

    return tree.map((branch) => {
      const leafs = branch.get('leafs');

      return leafs.map((leaf) => {
        const start = leaf.get('start');
        const end = leaf.get('end');
        const leafText = text.slice(start, end);
        const inlineParentEle = 'span';

        return React.createElement(inlineParentEle, {
        }, React.createElement(BlockLeaf, {
          text: leafText
        }));
      }).toArray();
    }).toArray();
  }

  render () {
    const block = this.props.block;
    const elementType = getElementForBlockOfType(block.getType());

    return React.createElement(elementType, {
      'data-block': true
    }, this._renderChild());
  }
}

ContentBlock.propTypes = {
  block: React.PropTypes.object.isRequired,
  tree: React.PropTypes.object.isRequired
};
