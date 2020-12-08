const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')
const webpack = require('webpack')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  // fixBabelImports("rsuite", {
  //   libraryName: "rsuite",
  //   styles: true,
  // }),
  // fixBabelImports("formik-antd", {
  //   libraryName: "formik-antd",
  //   style: true,
  //   libraryDirectory: "es",
  // }),
  // addReactRefresh({ disableRefreshCheck: true }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#6020FFFF', '@base-color': '#6020FFFF' }
    }
  })
  // addWebpackPlugin(
  //   new webpack.DefinePlugin({
  //   __RSUITE_CLASSNAME_PREFIX__: JSON.stringify('genie-boss-')
  // })
  // )
)
