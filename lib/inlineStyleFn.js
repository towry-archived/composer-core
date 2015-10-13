
import inlineType from './inlineType';
import ass from './util/ass';

/**
 * Return the class for the inline type
 */
export default function (type) {
  let klass = '';
  klass = (type & inlineType.BOLD ? ass('bold') : '') +
    (type & inlineType.ITALIC ? ass('italic', ' ') : '') + 
    (type & inlineType.UNDERLINE ? ass('underline', ' ') : '') +
    (type & inlineType.CODE ? ass('code', ' ') : '') +
    (type & inlineType.STRIKETHROUGH ? ass('strikethrough', ' ') : '');

  return klass;
}
