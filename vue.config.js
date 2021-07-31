const antdTheme = require('./src/theme.js')
const path = require('path');
const glob = require('glob');

module.exports = {
  publicPath: './',

  devServer: {
    proxy: 'http://localhost:8081',
  },

  chainWebpack: config => {

    config.plugin('define').tap(definitions => {
      // define process.env variables to use in application at runtime
      const env = definitions[0]['process.env'];

      return definitions;

    });

    config.plugin('copy').tap(args => {
      return args;

    })

    config.module
      .rule("eslint")
      .test(/\.(js|vue)$/)
      .use("eslint-loader")
      .options({
          fix: true,
      });

    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
  },

  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
    iconPaths: {
      favicon32: './favicon.png',
      favicon16: './favicon.png',
      appleTouchIcon: './favicon.png',
      maskIcon: './favicon.png',
      msTileImage: './favicon.png',
    },
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: antdTheme,
        javascriptEnabled: true,
      },
    },
  },

  configureWebpack: {
    resolve: {
        symlinks:false
    },
   },

  lintOnSave: true,
  runtimeCompiler: true,

  transpileDependencies: [
    'vuetify'
  ]
}
