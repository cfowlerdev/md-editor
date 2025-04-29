import React from 'react';
import { BaseEditor, createEditor, Editor, Text, Transforms } from 'slate';
import { Slate, withReact } from 'slate-react';
import { markdownToSlate } from '../../serializers/markdownToSlate';
import { slateToMarkdown } from '../../serializers/slateToMarkdown';

export interface IMarkdownEditorProviderProps {
  value?: string;
  onChange?: (val: string) => void;
  onSave?: () => void; // TODO: do we really need this?
  children: React.ReactNode;
}

export interface IMarkdownEditorContextType {
  editor: BaseEditor;
  value: any; // TODO: type
  setValue: (v: any) => void; // TODO: type
  actions: {
    toggleBold: () => void;
    toggleItalic: () => void;
    save: () => void;
  };
  markdown: string;
}

export const MarkdownEditorContext = React.createContext<
  IMarkdownEditorContextType | undefined
>(undefined);

export const MarkdownEditorProvider = ({
  children,
  value,
  onChange,
  onSave
}: IMarkdownEditorProviderProps) => {
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const initialValue = value
    ? markdownToSlate(value)
    : [{ type: 'paragraph', children: [{ text: '' }] }];
  const [internalValue, setInternalValue] = React.useState(initialValue);

  const setValue = (newValue: any) => {
    setInternalValue(newValue);
    const md = slateToMarkdown(newValue);
    onChange?.(md);
  };

  const toggleFormat = React.useCallback(
    (format: 'bold' | 'italic') => {
      const [match] = Array.from(
        Editor.nodes(editor, {
          // TODO: fix types here.
          // @ts-expect-error
          match: (n) => Text.isText(n) && n[format] === true,
          universal: true
        })
      );

      if (match) {
        Transforms.setNodes(
          editor,
          { [format]: false },
          { match: Text.isText, split: true }
        );
      } else {
        Transforms.setNodes(
          editor,
          { [format]: true },
          { match: Text.isText, split: true }
        );
      }
    },
    [editor]
  );

  const actions = {
    toggleBold: () => toggleFormat('bold'),
    toggleItalic: () => toggleFormat('italic'),
    save: () => onSave?.()
  };

  return (
    <MarkdownEditorContext.Provider
      value={{
        editor,
        value: internalValue,
        setValue,
        actions,
        markdown: slateToMarkdown(internalValue)
      }}
    >
      <Slate editor={editor} initialValue={internalValue} onChange={setValue}>
        {children}
      </Slate>
    </MarkdownEditorContext.Provider>
  );
};
