import { Transforms } from 'slate';
import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';

export const ListPlugin: IMarkdownPlugin = {
  key: 'list',
  renderElement: ({ attributes, children, element }) => {
    // @ts-expect-error
    if (element.type === 'ul') return <ul {...attributes}>{children}</ul>;
    // @ts-expect-error
    if (element.type === 'ol') return <ol {...attributes}>{children}</ol>;
    // @ts-expect-error
    if (element.type === 'li') return <li {...attributes}>{children}</li>;
    return <p {...attributes}>{children}</p>;
  },
  actions: {
    setBulletedList: (editor) => {
      // @ts-expect-error
      Transforms.setNodes(editor, { type: 'li' });
      // @ts-expect-error
      Transforms.wrapNodes(editor, { type: 'ul', children: [] });
    },
    setNumberedList: (editor) => {
      // @ts-expect-error
      Transforms.setNodes(editor, { type: 'li' });
      // @ts-expect-error
      Transforms.wrapNodes(editor, { type: 'ol', children: [] });
    }
  }
};
