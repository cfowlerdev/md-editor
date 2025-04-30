import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';
import { toggleMark } from '../utils/marks';

export const CodePlugin: IMarkdownPlugin = {
  key: 'code',
  onKeyDown: (event, editor) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'e') {
      toggleMark(editor, 'code');
      return true;
    }
    return false;
  },
  renderLeaf: ({ attributes, children, leaf }) => {
    // @ts-expect-error
    if (leaf.code) return <code {...attributes}>{children}</code>;
    return undefined;
  },
  actions: {
    toggleCode: (editor) => toggleMark(editor, 'code')
  }
};
