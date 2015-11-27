var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        app: ['./src/main.js']
    },
    output: {
        path: path.join(__dirname, 'static'),
        publicPath: '/static/',
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel?optional[]=runtime&loose=all'
        }, {
            test: /\.scss$/,
            loader: "style!css!autoprefixer!sass"
        }, {
            test: /\.css$/,
            loader: 'style!css!autoprefixer'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=1000'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.scss'],
        alias: {
            // zepto: path.join(__dirname, 'src/libs/zepto/zepto.js'),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': true,
            '__TEST__': false,
            '__PROD__': false,
        }),
        new webpack.ProvidePlugin({
            "$": "npm-zepto",
            "Zepto": "npm-zepto",
            "window.Zepto": "npm-zepto",
            "_": "underscore",
            "FastClick": "fastclick",
            "Daze":path.join(__dirname,'src/libs_native/native')
        })
    ]

}
