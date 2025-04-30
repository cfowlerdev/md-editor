import { Transforms } from 'slate';
import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';

export const HorizontalRulePlugin: IMarkdownPlugin = {
  key: 'hr',
  renderElement: ({ attributes, children, element }) => {
    // @ts-expect-error
    if (element.type === 'hr') {
      return <hr {...attributes} />;
    }
    return <p {...attributes}>{children}</p>;
  },
  actions: {
    insertHorizontalRule: (editor) => {
      // @ts-expect-error
      Transforms.insertNodes(editor, { type: 'hr', children: [{ text: '' }] });
    }
  }
};
