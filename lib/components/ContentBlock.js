
import React, { Component } from 'react';
import { getElementForBlockOfType } from '../blockRenderer';
import BlockLeaf from './BlockLeaf';
import offsetKey from '../util/offsetKey';
import entityRenderer from '../entityRenderer';

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
    const entityRenderFn = this.props.entityRenderer || entityRenderer;
    const characterList = block.getCharacterList();

    return tree.map((branch, i) => {
      const leafs = branch.get('leafs');

      let renderedLeafs = leafs.map((leaf, j) => {
        const start = leaf.get('start');
        const end = leaf.get('end');
        const leafText = text.slice(start, end);
        const dataOffsetKey = offsetKey.generate(key, i, j);
        const style = characterList.get(start).get('style');

        return React.createElement(BlockLeaf, {
          text: leafText,
          offsetKey: dataOffsetKey,
          key: j,
          style: style,
          inlineStyleFn: this.props.inlineStyleFn
        });
      }).toArray();

      // render the entity
      let entityKey = getEntityKeyFromBlock(block, branch.get('start'));
      if (entityKey === null) {
        return renderedLeafs;
      }

      let entity = this.props.entityMap.get(entityKey);
      let component = entityRenderFn(entity.type);

      if (!component) {
        return renderedLeafs;
      }

      if (!entity) {
        return renderedLeafs;
      }

      let EntityComponent = component.component;
      return React.createElement(EntityComponent, {
        entity: entity,
        key: i
      }, renderedLeafs);
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
  tree: React.PropTypes.object.isRequired,
  entityRenderer: React.PropTypes.func,
  entityMap: React.PropTypes.object.isRequired,
  inlineStyleFn: React.PropTypes.func
};

export function getEntityKeyFromBlock (block, start) {
  let characterList = block.getCharacterList();

  let key = characterList.get(start).get('entity');
  return key;
}
