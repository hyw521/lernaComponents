import { defineConfig, IConfig } from 'dumi';
export default defineConfig({
    // ssr: {},
    exportStatic: {},
    nodeModulesTransform: {
      type: 'none',
      exclude: [],
    },
    extraBabelPlugins: [
        [
          'babel-plugin-import',
          {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
          },
          'antd',
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@alifd/next',
            style: false,
          },
          'fusion',
        ],
      ],
    mode: 'site',
    title: 'business components',
    // favicon: '/simple-logo.svg',
    // logo: '/logo.svg',
    locales:[['zh-CN', '中文'],['en-US', 'English']],
    dynamicImport: {},
    manifest: {},
    // links: [{ rel: 'manifest', href: '/asset-manifest.json' }],
    hash: true,
    resolve: {
      includes: ['docs','packages/hyw-table','packages/hyw-todo-list']
    },
    navs: {
      'zh-CN': [
        null,
      ],
      'en-US': [
        null,
        
      ],
    },
  }) as IConfig
  