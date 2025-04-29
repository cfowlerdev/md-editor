export const markdownToSlate = (markdown: string) => {
  return [
    {
      type: 'paragraph',
      children: [{ text: markdown }]
    }
  ];
};
