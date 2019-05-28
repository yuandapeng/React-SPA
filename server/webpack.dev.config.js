const path = require("path");
const HtmlPlugin = require('html-webpack-plugin');//html 打包
const CustomTheme = require("./theme");
const webpack=require("webpack");
module.exports = {
    mode: "development",
    entry: {
        vendor: [
            "raf/polyfill",//ie9 requestAnimateFrame
            "babel-polyfill" //ie9/10 api
        ],
        //里面的main是可以随便写的
        index: ["./client/index"]
    },
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "[name].js",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    'postcss-loader'
                ] // 编译顺序从右往左
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [

                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    'postcss-loader'
                ] // 编译顺序从右往左
            },
            {
                test: /\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use: [{
                    loader: 'url-loader', //是指定使用的loader和loader的配置参数
                    options: {
                        limit: 50, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath: 'images',  //打包后的图片放到images文件夹下
                    }
                }]
            },
            //单独处理node_modules下less
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer")("last 100 versions")
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: CustomTheme
                        }
                    }
                ] // 编译顺序从右往左
            },
            //自定义less文件处理
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer")("last 100 versions")
                            ]
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ] // 编译顺序从右往左
            },
            {
                test: /\.(jsx|js)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                ["@babel/preset-react"],//解析react
                                ["@babel/preset-env", {loose: true}] //es语法、loose开启ie继承
                            ],
                            "plugins": [
                                ["import", {"libraryName": "antd", "style": true}],//css 样式按需加载
                                ["@babel/plugin-proposal-decorators", {"legacy": true}],//处理注解
                                ["@babel/plugin-proposal-class-properties"],//处理类属性
                                ["@babel/plugin-syntax-dynamic-import"],
                                ['@babel/plugin-transform-runtime'] //处理 sync 语法糖 
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ],
    },
    devtool: 'cheap-eval-source-map',
    resolve:{
        alias: {
            "@components":path.resolve("client/components"),
            "@pages":path.resolve("client/pages"),
            "@utils":path.resolve("client/utils"),
            "@model":path.resolve("client/model"),
            "@services":path.resolve("client/services"),
        },
        mainFiles:["index"] //默认index.js 为入口文件
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //配置模板文件
        new HtmlPlugin({
            minify: { //是对html文件进行压缩
                removeAttributeQuotes: true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './client/index.html' //是要打包的html模版路径和文件名称。
        })
    ],
    optimization: {
        splitChunks: {
            name: 'vendor',
            minChunks: Infinity
        }
    },
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, "../public"),
        //服务器ip地址
        host: '127.0.0.1',
        //开启服务器端压缩
        compress: true,
        //端口
        port: "8888"
    }
};
