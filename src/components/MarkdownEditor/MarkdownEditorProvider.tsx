import React from 'react';
import { BaseEditor, createEditor, Editor, Text, Transforms } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { markdownToSlate } from '@serializers/markdownToSlate';
import { slateToMarkdown } from '@serializers/slateToMarkdown';
import { IMarkdownPlugin } from '@plugins/types';

// TODO: Move this out to a separate place. Where?

export interface IMarkdownEditorProviderProps {
  children: React.ReactNode;
  value?: string;
  onChange?: (val: string) => void;
  plugins?: IMarkdownPlugin[];
}

export interface IMarkdownEditorContextType {
  editor: BaseEditor;
  value: any; // TODO: type
  setValue: (v: any) => void; // TODO: type
  actions: {
    toggleBold: () => void;
    toggleItalic: () => void;
  };
  markdown: string;
  plugins: IMarkdownPlugin[];
}

export const MarkdownEditorContext = React.createContext<
  IMarkdownEditorContextType | undefined
>(undefined);

export const MarkdownEditorProvider = ({
  children,
  value,
  onChange,
  plugins = []
}: IMarkdownEditorProviderProps) => {
  // Create the editor using memoisation, to avoid new editor being created every render
  // let editor = React.useMemo(() => withReact(createEditor()), []);
  // editor = React.useMemo(() => withHistory(plugins.reduce((ed, p) => p.withEditor?.(ed) ?? ed, editor)), [plugins]);
  const baseEditor = React.useMemo(() => withReact(createEditor()), []);
  const editor = React.useMemo(() => {
    const withPlugins = plugins.reduce(
      (ed, plugin) => (plugin.withEditor ? plugin.withEditor(ed) : ed),
      baseEditor
    );
    return withHistory(withPlugins);
  }, [plugins, baseEditor]);

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
    toggleItalic: () => toggleFormat('italic')
  };

  return (
    <MarkdownEditorContext.Provider
      value={{
        editor,
        value: internalValue,
        setValue,
        actions,
        markdown: slateToMarkdown(internalValue),
        plugins
      }}
    >
      <Slate editor={editor} initialValue={internalValue} onChange={setValue}>
        {children}
      </Slate>
    </MarkdownEditorContext.Provider>
  );
};
