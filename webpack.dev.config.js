const path = require("path");
const HtmlPlugin = require('html-webpack-plugin');//html 打包
const CustomTheme = require("./theme");
module.exports = {
    entry: {
        vendor: [
            "raf/polyfill",//ie9 requestAnimateFrame
            "babel-polyfill" //ie9/10 api
        ],
        //里面的main是可以随便写的
        main: "./src/main"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
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
                            importLoaders:2
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
                            modifyVars:CustomTheme
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
                            importLoaders:2,
                            modules:true
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
                                ["@babel/preset-env",{loose:true}] //es语法、loose开启ie继承
                            ],
                            "plugins": [
                                ["import", {"libraryName": "antd", "style": true}],//css 样式按需加载
                                ["@babel/plugin-proposal-decorators", { "legacy": true }],//处理注解
                                ["@babel/plugin-proposal-class-properties"]//处理类属性
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: "cheap-module-eval-source-map",
    plugins: [
        //配置模板文件
        new HtmlPlugin({
            minify: { //是对html文件进行压缩
                removeAttributeQuotes: true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/index.html' //是要打包的html模版路径和文件名称。
        }),
    ],
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, "../dist"),
        //服务器ip地址
        host: '127.0.0.1',
        //开启服务器端压缩
        compress: true,
        //端口
        port: "8888"
    }
};