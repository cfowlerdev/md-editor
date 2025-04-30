import { Editable } from 'slate-react';
import { useMarkdownEditor } from '../../hooks/useMarkdownEditor';

export const MarkdownEditorInput = () => {
  const { editor, plugins } = useMarkdownEditor();

  return (
    <Editable
      renderLeaf={(props) => {
        for (const plugin of plugins) {
          if (plugin.renderLeaf) return plugin.renderLeaf(props);
        }
        return <span {...props.attributes}>{props.children}</span>;
      }}
      onKeyDown={(event) => {
        for (const plugin of plugins) {
          if (plugin.onKeyDown?.(event, editor)) {
            event.preventDefault();
            return;
          }
        }
      }}
    />
  );
};
