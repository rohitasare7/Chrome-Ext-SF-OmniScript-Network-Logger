const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    'index': {
      entry: './src/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    'popup': {
      entry: './src/popup.js',
      template: 'public/popup.html',
      title: 'popup',
      chunks: ['chunk-vendors', 'chunk-common', 'popup']
    }
  }
})
