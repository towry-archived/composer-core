
import entityType from './entityType';
import TextLink from './components/TextLink';

/**
 * Determine which component should we use to 
 * render current entity
 * @param {number} type
 * @return {null|object}
 */
export default function entityRenderer (type) {
  switch (type) {
  case entityType.LINK:
    return {
      component: TextLink
    };
  default: 
    return null;
  }
}
