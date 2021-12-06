import { MarkType, Schema as ProseMirrorSchema } from 'prosemirror-model';
import {
  marks as basicSchemaMarks,
  nodes as basicSchemaNodes,
  schema as basicSchema,
} from 'prosemirror-schema-basic';

import { TextStrikethroughMarkSpec, TextUnderlineMarkSpec } from './marks';

import { buildMarkupItem, menuIconsMapping } from '../-utils';

MarkType.prototype.toMenuItem = function () {
  if (menuIconsMapping[this.name]) {
    return buildMarkupItem(this, menuIconsMapping[this.name]);
  }
};

const schema = new ProseMirrorSchema({
  marks: {
    ...basicSchemaMarks,
    strikethrough: TextStrikethroughMarkSpec,
    underline: TextUnderlineMarkSpec,
  },
  nodes: {
    emoji: {
      // Dinosaurs have one attribute, their type, which must be one of
      // the types defined above.
      // Brontosaurs are still the default dino.
      attrs: { id: { default: 0 } },
      inline: true,
      group: 'inline',
      draggable: false,
      selectable: true,

      // These nodes are rendered as images with a `dino-type` attribute.
      // There are pictures for all dino types under /img/dino/.
      toDOM: (node) => [
        'img',
        {
          'emoji-id': node.attrs.id,
          src:
            'https://neekhaulas-harmony.s3.eu-central-1.amazonaws.com/' +
            node.attrs.id +
            '.png',
          title: node.attrs.id,
          class: 'emoji',
        },
      ],
      // When parsing, such an image, if its type matches one of the known
      // types, is converted to a dino node.
      parseDOM: [
        {
          tag: 'img[emoji-id]',
          getAttrs: (dom) => {
            let id = dom.getAttribute('emoji-id');
            return { id };
          },
        },
      ],
    },
    doc: basicSchemaNodes.doc,
    text: basicSchemaNodes.text,
    block: basicSchemaNodes.paragraph,
  },
});

export default schema;
export { schema };
