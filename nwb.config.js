module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactEventSource',
      externals: {
        react: 'React'
      }
    }
  }
}
