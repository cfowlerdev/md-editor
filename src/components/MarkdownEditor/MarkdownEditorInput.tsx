import React from 'react';
import { Editable, RenderElementProps, RenderLeafProps } from 'slate-react';
import { clsx } from 'clsx';
import { useMarkdownEditor } from '@hooks/useMarkdownEditor';
import { IMarkdownPlugin } from '@plugins/types';
import { CLSNAME_EDITABLE } from '@constants/classnames';

export interface IMarkdownEditorInput {
  editableClassname?: string;
}

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

export const MarkdownEditorInput = ({
  editableClassname
}: IMarkdownEditorInput) => {
  const { editor, plugins } = useMarkdownEditor();

  const renderLeaf = React.useMemo(() => createRenderLeaf(plugins), [plugins]);
  const renderElement = React.useMemo(
    () => createRenderElement(plugins),
    [plugins]
  );

  return (
    <Editable
      className={clsx(CLSNAME_EDITABLE, editableClassname)}
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
