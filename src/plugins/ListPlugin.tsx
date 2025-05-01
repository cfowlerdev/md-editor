import { Transforms } from 'slate';
import { IMarkdownPlugin } from './types';
import { CLSNAME_LI, CLSNAME_OL, CLSNAME_UL } from '@constants/classnames';

export const ListPlugin: IMarkdownPlugin = {
  key: 'list',
  renderElement: ({ attributes, children, element }) => {
    // @ts-expect-error
    if (element.type === 'ul')
      return (
        <ul {...attributes} className={CLSNAME_UL}>
          {children}
        </ul>
      );
    // @ts-expect-error
    if (element.type === 'ol')
      return (
        <ol {...attributes} className={CLSNAME_OL}>
          {children}
        </ol>
      );
    // @ts-expect-error
    if (element.type === 'li')
      return (
        <li {...attributes} className={CLSNAME_LI}>
          {children}
        </li>
      );
    return undefined;
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
