
import React, { Component } from 'react';
import inlineStyleFn from '../inlineStyleFn';

export default class BlockLeaf extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    let inlineStyle = this.props.inlineStyleFn || inlineStyleFn;
    let klass = this.props.style ? inlineStyle(this.props.style) : '';
    return <span className={klass} data-offset={this.props.offsetKey}>{this.props.text}</span>;
  }
}

BlockLeaf.propTypes = {
  text: React.PropTypes.string,
  offsetKey: React.PropTypes.string.isRequired,
  inlineStyleFn: React.PropTypes.func,
  style: React.PropTypes.number
};
