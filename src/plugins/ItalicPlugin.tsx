import { CLSNAME_ITALIC } from '@constants/classnames';
import { IMarkdownPlugin } from './types';
import { toggleMark } from '@utils/marks';

export const ItalicPlugin: IMarkdownPlugin = {
  key: 'italic',
  onKeyDown: (event, editor) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'i') {
      toggleMark(editor, 'italic');
      return true;
    }
    return false;
  },
  renderLeaf: ({ attributes, children, leaf }) => {
    // @ts-expect-error
    if (leaf.italic)
      return (
        <em {...attributes} className={CLSNAME_ITALIC}>
          {children}
        </em>
      );
    return undefined;
  },
  actions: {
    toggleItalic: (editor) => toggleMark(editor, 'italic')
  }
};
