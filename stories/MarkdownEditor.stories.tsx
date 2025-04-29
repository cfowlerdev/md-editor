import React from 'react';
import {
  MarkdownEditorProvider,
  MarkdownEditorInput,
  MarkdownEditorPreview
} from '../src/components/MarkdownEditor';
import { useMarkdownEditor } from '../src/hooks/useMarkdownEditor';

export default {
  title: 'MarkdownEditor/Basic',
  component: MarkdownEditorInput
};

const Toolbar = () => {
  const { actions } = useMarkdownEditor();

  return (
    <div style={{ marginBottom: 8, gap: 4, display: 'flex' }}>
      <button onClick={actions.toggleBold}>Bold</button>
      <button onClick={actions.toggleItalic}>Italic</button>
      <button onClick={actions.save}>Save</button>
    </div>
  );
};

export const DefaultEditor = () => {
  const [markdown, setMarkdown] = React.useState('Hello world!');

  return (
    <MarkdownEditorProvider
      value={markdown}
      onChange={setMarkdown}
      onSave={() => alert('Saved!')}
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
