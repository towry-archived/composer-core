
import React, { Component } from 'react';

export default class BlockLeaf extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    let decoratedView = this.props.decorate(this.props.type);
    if (!decoratedView) {
      return <span></span>;
    } else {
      return decoratedView;
    }
  }
}
