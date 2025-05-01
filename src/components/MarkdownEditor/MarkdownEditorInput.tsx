import React from 'react';
import { Editable, RenderElementProps, RenderLeafProps } from 'slate-react';
import { useMarkdownEditor } from '@hooks/useMarkdownEditor';
import { IMarkdownPlugin } from '@plugins/types';

const createRenderLeaf =
  (plugins: IMarkdownPlugin[]) => (props: RenderLeafProps) => {
    const { attributes } = props;
    // Apply all matching plugins
    let children = props.children;
    for (const plugin of plugins) {
      if (plugin.renderLeaf) {
        const wrapped = plugin.renderLeaf({ ...props, children });
        if (wrapped !== undefined) {
          children = wrapped;
        }
      }
    }

    // Wrap in a span with attributes at the end
    return <span {...attributes}>{children}</span>;
  };

const createRenderElement =
  (plugins: IMarkdownPlugin[]) => (props: RenderElementProps) => {
    for (const plugin of plugins) {
      if (plugin.renderElement) {
        const result = plugin.renderElement(props);
        if (result !== undefined) return result;
      }
    }

    // Fallback if no plugin handled it
    return <p {...props.attributes}>{props.children}</p>;
  };

export const MarkdownEditorInput = () => {
  const { editor, plugins } = useMarkdownEditor();

  const renderLeaf = React.useMemo(() => createRenderLeaf(plugins), [plugins]);
  const renderElement = React.useMemo(
    () => createRenderElement(plugins),
    [plugins]
  );

  return (
    <Editable
      renderLeaf={renderLeaf}
      renderElement={renderElement}
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
