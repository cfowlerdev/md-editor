import React from 'react';

export interface IMarkdownEditorProviderProps {
  value?: string;
  onChange?: (val: string) => void;
  onSave?: () => void; // TODO: do we really need this?
  children: React.ReactNode;
}

export interface IMarkdownEditorContextType {
  markdown: string;
  setMarkdown: (val: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  actions: {
    bold: () => void;
    italic: () => void;
    save: () => void;
  };
}

export const MarkdownEditorContext = React.createContext<
  IMarkdownEditorContextType | undefined
>(undefined);

export const MarkdownEditorProvider = ({
  children,
  value: controlledValue,
  onChange,
  onSave
}: IMarkdownEditorProviderProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [internalValue, setInternalValue] = React.useState(
    controlledValue || ''
  );

  const markdown = controlledValue ?? internalValue;

  const setMarkdown = (val: string) => {
    onChange?.(val);
    if (!controlledValue) {
      setInternalValue(val);
    }
  };

  const actions = {
    bold: () => console.log('Set BOLD'),
    italic: () => console.log('Set ITALIC'),
    save: () => onSave?.()
  };

  return (
    <MarkdownEditorContext.Provider
      value={{
        markdown,
        textareaRef,
        setMarkdown,
        actions
      }}
    >
      {children}
    </MarkdownEditorContext.Provider>
  );
};
