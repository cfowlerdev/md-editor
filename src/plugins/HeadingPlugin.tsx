// import React from 'react';
// import { Editor, Transforms } from 'slate';
// import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';

// TODO: Needs some work!  Where do we get JSX from
// export const HeadingPlugin = ({ levels = [1, 2, 3] } = {}): IMarkdownPlugin => ({
//   key: "heading",
//   renderElement: ({ attributes, children, element }) => {
//     if (element.type && element.type.startsWith("heading")) {
//       const level = (element.type.match(/heading(\d)/)?.[1] || 1);
//       const Tag = `h${level}` as keyof JSX.IntrinsicElements;
//       return <Tag {...attributes}>{children}</Tag>;
//     }
//     return <p {...attributes}>{children}</p>;
//   },
//   actions: Object.fromEntries(
//     levels.map((level) => [
//       `setHeading${level}`,
//       (editor: Editor) => {
//         Transforms.setNodes(
//           editor,
//           { type: `heading${level}` },
//           { match: (n) => Editor.isBlock(editor, n) }
//         );
//       },
//     ])
//   ),
// });
