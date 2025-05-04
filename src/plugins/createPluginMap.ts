import { IMarkdownPlugin } from './types';

export function createPluginMap(plugins: IMarkdownPlugin[]) {
  const map = new Map<string, IMarkdownPlugin>();
  for (const plugin of plugins) {
    map.set(plugin.key, plugin);
  }
  return map;
}
