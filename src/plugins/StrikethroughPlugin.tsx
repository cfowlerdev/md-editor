import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';
import { toggleMark } from '../utils/marks';

export const StrikethroughPlugin: IMarkdownPlugin = {
  key: 'strikethrough',
  onKeyDown: (event, editor) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'x') {
      toggleMark(editor, 'strikethrough');
      return true;
    }
    return false;
  },
  renderLeaf: ({ attributes, children, leaf }) => {
    // @ts-expect-error
    if (leaf.strikethrough) return <s {...attributes}>{children}</s>;
    return undefined;
  },
  actions: {
    toggleStrikethrough: (editor) => toggleMark(editor, 'strikethrough')
  }
};
