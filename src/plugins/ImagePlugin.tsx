// import { Transforms } from 'slate';
// import { IMarkdownPlugin } from '../components/MarkdownEditor/MarkdownEditorProvider';

// export const ImagePlugin: IMarkdownPlugin = {
//   key: 'image',
//   renderElement: ({ attributes, children, element }) => {
//     if (element.type === 'image') {
//       return <img {...attributes} src={element.url} alt={element.alt || ''} />;
//     }
//     return <p {...attributes}>{children}</p>;
//   },
//   actions: {
//     insertImage: (editor, url: string, alt = '') => {
//       if (!url) return;
//       const image = {
//         type: 'image',
//         url,
//         alt,
//         children: [{ text: '' }]
//       };
//       Transforms.insertNodes(editor, image);
//     }
//   }
// };
