module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/foodpocket/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/assets/all.scss";'
      }
    }
  }
}
