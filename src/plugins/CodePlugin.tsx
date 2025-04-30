import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';
import { toggleMark } from '../utils/marks';
import './code.css';

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
    return <span {...attributes}>{children}</span>;
  },
  actions: {
    toggleCode: (editor) => toggleMark(editor, 'code')
  }
};
