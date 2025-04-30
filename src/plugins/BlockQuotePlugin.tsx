import { Transforms, Editor, Element } from 'slate';
import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';

export const BlockquotePlugin: IMarkdownPlugin = {
  key: 'blockquote',
  renderElement: ({ attributes, children, element }) => {
    // @ts-expect-error
    if (element.type === 'blockquote') {
      return <blockquote {...attributes}>{children}</blockquote>;
    }
    return <p {...attributes}>{children}</p>;
  },
  actions: {
    toggleBlockquote: (editor) => {
      const isActive =
        Editor.nodes(editor, {
          match: (n) =>
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            // @ts-expect-error
            n.type === 'blockquote'
        }).next().done === false;

      Transforms.setNodes(
        editor,
        // @ts-expect-error
        { type: isActive ? 'paragraph' : 'blockquote' },
        // @ts-expect-error
        { match: (n) => Editor.isBlock(editor, n) }
      );
    }
  }
};
