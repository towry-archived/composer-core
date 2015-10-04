
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

    return this.props.block.getText();

    return tree.map(function (branch, i) {
      let leafs = branch.get('leafs');
      console.log(leafs.toJS());

      return [];
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
