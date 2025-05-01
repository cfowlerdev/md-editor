import React from 'react';
import { BaseEditor, Editor } from 'slate';
import { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';

export interface IMarkdownPlugin {
  key: string; // e.g., "bold"
  onKeyDown?: (event: React.KeyboardEvent, editor: Editor) => boolean;
  renderLeaf?: (props: RenderLeafProps) => React.JSX.Element | undefined;
  renderElement?: (props: RenderElementProps) => React.JSX.Element | undefined;
  withEditor?: (editor: BaseEditor & ReactEditor) => BaseEditor & ReactEditor;
  actions?: Record<string, (editor: Editor) => void>;
}
