
import React, { Component } from 'react';

export default class BlockLeaf extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return <span data-offset={this.props.offsetKey}>{this.props.text}</span>;
  }
}

BlockLeaf.propTypes = {
  text: React.PropTypes.string
};
