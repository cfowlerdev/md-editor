import React from 'react';
import {
  MarkdownEditorProvider,
  MarkdownEditorInput,
  MarkdownEditorPreview
} from '../src/components/MarkdownEditor';
import { useMarkdownEditor } from '../src/hooks/useMarkdownEditor';
import { coreMarkdownPlugins } from '../src/plugins';

export default {
  title: 'MarkdownEditor/Basic',
  component: MarkdownEditorInput
};

const Toolbar = () => {
  const { editor, actions } = useMarkdownEditor();

  return (
    <div style={{ display: 'flex', gap: '8px', padding: '4px' }}>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          actions.toggleBold?.(editor);
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          actions.toggleItalic?.(editor);
        }}
      >
        Italic
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          actions.toggleCode?.(editor);
        }}
      >
        Code
      </button>
    </div>
  );
};

export const DefaultEditor = () => {
  const [markdown, setMarkdown] = React.useState('Hello world!');

  return (
    <MarkdownEditorProvider
      value={markdown}
      onChange={setMarkdown}
      plugins={coreMarkdownPlugins}
    >
      <Toolbar />
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: 8 }}>
          <MarkdownEditorInput />
        </div>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: 8 }}>
          <MarkdownEditorPreview />
        </div>
      </div>
    </MarkdownEditorProvider>
  );
};
