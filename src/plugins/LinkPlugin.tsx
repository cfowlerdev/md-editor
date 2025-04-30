// import { Transforms, Editor, Range, Element as SlateElement } from 'slate';
// import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';

// export const LinkPlugin: IMarkdownPlugin = {
//   key: 'link',
//   renderElement: ({ attributes, children, element }) => {
//     if (element.type === 'link') {
//       return (
//         <a
//           {...attributes}
//           href={element.url}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           {children}
//         </a>
//       );
//     }
//     return <p {...attributes}>{children}</p>;
//   },
//   actions: {
//     insertLink: (editor, url: string) => {
//       if (!url) return;
//       const { selection } = editor;
//       const isCollapsed = selection && Range.isCollapsed(selection);

//       const link = {
//         type: 'link',
//         url,
//         children: isCollapsed ? [{ text: url }] : []
//       };

//       if (isCollapsed) {
//         Transforms.insertNodes(editor, link);
//       } else {
//         Transforms.wrapNodes(editor, link, { split: true });
//       }
//     },
//     removeLink: (editor) => {
//       Transforms.unwrapNodes(editor, {
//         match: (n) =>
//           !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link'
//       });
//     }
//   }
// };
