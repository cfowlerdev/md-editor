import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';
import { toggleMark } from '../utils/marks';

export const BoldPlugin: IMarkdownPlugin = {
  key: 'bold',
  onKeyDown: (event, editor) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
      toggleMark(editor, 'bold');
      return true;
    }
    return false;
  },
  renderLeaf: ({ attributes, children, leaf }) => {
    // @ts-expect-error
    if (leaf.bold) return <strong {...attributes}>{children}</strong>;
    return undefined;
  },
  actions: {
    toggleBold: (editor) => toggleMark(editor, 'bold')
  }
};
