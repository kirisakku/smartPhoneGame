var path = require('path');
// var saveLicense = require('uglify-save-license');

module.exports = {
  //エントリポイントのJavaScript
  entry: {
    bundle: './src/main.js'
  },

  output: {
    //出力先のフォルダ
    path: path.resolve(__dirname, 'build'),
    //出力先のファイル名
    filename: 'bundle.js'
  },

  //出力するsource mapのスタイル
  devtool: '#source-map',

  module: {
    rules: [

      { //babel用の設定
        test: /\.js$/,
        exclude: /node_modules/, //node_modules以下は対象から外す
        loader: 'babel-loader'
      }
    ]
  }
};