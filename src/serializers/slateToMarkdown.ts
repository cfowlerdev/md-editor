// Can be replaced with an existing serializer, like slate-markdown

export const slateToMarkdown = (value: any[]): string => {
  return value
    .map((n: any) => {
      return n.children
        ?.map((c: any) => {
          let text = c.text || '';
          if (c.bold) text = `**${text}**`;
          if (c.italic) text = `_${text}_`;
          return text;
        })
        .join('');
    })
    .join('\n');
};
