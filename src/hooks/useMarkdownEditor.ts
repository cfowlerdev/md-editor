import React from 'react';
import {
  MarkdownEditorContext,
  IMarkdownEditorContextType
} from '../components/MarkdownEditor/MarkdownEditorProvider';

export const useMarkdownEditor = (): IMarkdownEditorContextType => {
  const ctx = React.useContext(MarkdownEditorContext);
  if (!ctx)
    throw new Error(
      'useMarkdownEditor must be used within a MarkdownEditorProvider'
    );
  return ctx;
};
