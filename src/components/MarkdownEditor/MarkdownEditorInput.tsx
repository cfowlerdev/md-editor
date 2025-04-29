import { useMarkdownEditor } from '../../hooks/useMarkdownEditor';

export const MarkdownEditorInput = () => {
  const { markdown, setMarkdown, textareaRef } = useMarkdownEditor();

  return (
    <textarea
      ref={textareaRef}
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      rows={10}
      style={{ width: '100%', fontFamily: 'monospace' }}
    />
  );
};
