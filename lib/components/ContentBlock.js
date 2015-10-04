
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
    const key = block.getKey();

    return tree.map(function (branch, i) {
      const leafs = branch.get('leafs');

      return leafs.map(function (leaf, j) {
        const start = leaf.get('start');
        const end = leaf.get('end');
        const leafText = text.slice(start, end);

        return <BlockLeaf text={leafText} />
      }.bind(this)).toArray();
    }.bind(this)).toArray();
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
