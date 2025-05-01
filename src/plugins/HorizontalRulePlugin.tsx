import { Transforms } from 'slate';
import { IMarkdownPlugin } from './types';

export const HorizontalRulePlugin: IMarkdownPlugin = {
  key: 'hr',
  renderElement: ({ attributes, element }) => {
    // @ts-expect-error
    if (element.type === 'hr') {
      return <hr {...attributes} />;
    }
    return undefined;
  },
  actions: {
    insertHorizontalRule: (editor) => {
      // @ts-expect-error
      Transforms.insertNodes(editor, { type: 'hr', children: [{ text: '' }] });
    }
  }
};
