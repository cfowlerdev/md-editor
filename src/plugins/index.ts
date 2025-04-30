import { BoldPlugin } from './BoldPlugin';
import { CodePlugin } from './CodePlugin';
import { ItalicPlugin } from './ItalicPlugin';
import { StrikethroughPlugin } from './StrikethroughPlugin';

export { BoldPlugin } from './BoldPlugin';
export { CodePlugin } from './CodePlugin';
export { ItalicPlugin } from './ItalicPlugin';
export { StrikethroughPlugin } from './StrikethroughPlugin';

export const coreMarkdownPlugins = [
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin
  // HeadingPlugin,
  // BlockquotePlugin,
  // CodeBlockPlugin,
  // ListPlugin,
  // LinkPlugin,
  // ImagePlugin,
  // HorizontalRulePlugin,
];
