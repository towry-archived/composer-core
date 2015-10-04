
import React, { Component } from 'react';
import { getElementForBlockOfType } from '../blockRenderer';

export default class ContentBlock extends Component {

  static displayName = 'ContentBlock';

  constructor (props) {
    super(props);
  }

  render () {
    const block = this.props.block;
    const elementType = getElementForBlockOfType(block.getType());
    const text = block.getText();

    return React.createElement(elementType, {
      'data-block': true
    }, text);
  }
}

ContentBlock.propTypes = {
  block: React.PropTypes.object.isRequired
};
