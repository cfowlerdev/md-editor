import { Editor } from 'slate';

export const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  // @ts-expect-error
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: Editor, format: string) => {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
