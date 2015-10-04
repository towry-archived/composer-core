/**
 * @public
 * @readonly
 * @enum {number}
 */
const inlineType = {
  NONE: 0,
  BOLD: 1,
  ITALIC: 2,
  UNDERLINE: 4,
  CODE: 8,
  STRIKETHROUGH: 16,
  SUBSCRIPT: 32,
  SUPERSCRIPT: 64
};

export default inlineType;
