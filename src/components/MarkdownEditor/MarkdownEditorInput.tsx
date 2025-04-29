import React from 'react';
import { Editable, RenderLeafProps } from 'slate-react';

const Leaf: React.FunctionComponent<RenderLeafProps> = ({
  attributes,
  children,
  leaf
}) => {
  //@ts-expect-error
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  //@ts-expect-error
  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  //@ts-expect-error
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

const renderLeaf = (props: RenderLeafProps) => {
  return <Leaf {...props} />;
};

export const MarkdownEditorInput = () => {
  return <Editable renderLeaf={renderLeaf} />;
};
