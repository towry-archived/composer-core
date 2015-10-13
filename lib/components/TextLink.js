
import React, { Component } from 'react';
import ass from '../util/ass';

export default class TextLink extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let entity = this.props.entity;
    let href = entity.data.url;

    return (
      <a href={href} target="_blank" className={ass('link')}>
        { this.props.children }
      </a>
    );
  }
}

TextLink.propTypes = {
  entity: React.PropTypes.object.isRequired,
  children: React.PropTypes.any
};
