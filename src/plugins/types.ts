import React from 'react';
import { BaseEditor, Editor, Element as SlateElement } from 'slate';
import { ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { Node as MdastNode } from 'mdast';

export interface IMarkdownPlugin {
  key: string; // e.g., "bold"

  onKeyDown?: (event: React.KeyboardEvent, editor: Editor) => boolean;
  renderLeaf?: (props: RenderLeafProps) => React.JSX.Element | undefined;
  renderElement?: (props: RenderElementProps) => React.JSX.Element | undefined;
  withEditor?: (editor: BaseEditor & ReactEditor) => BaseEditor & ReactEditor;
  actions?: Record<string, (editor: Editor) => void>;

  // Serialization hooks
  toMDX?: (element: SlateElement) => string;
  toHTML?: (element: SlateElement) => string;

  // Deserialization hooks
  fromMDX?: (node: MdastNode) => SlateElement;
}

// TODO: Need to add MDAST
// - Need to loop over serializations and serialize
// - Need to loop over deserialization and deserialize

// toMDX and toHTML return strings since MDX/HTML are linear text formats
// toMarkdown and fromMarkdown use structured MDAST nodes
