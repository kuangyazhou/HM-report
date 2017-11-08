module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: '禾苗数据可视化平台',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '禾苗数据可视化平台' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            { src: 'http://api.map.baidu.com/getscript?v=2.0&ak=ZUONbpqGBsYGXNIYHicvbAbM' }
        ]
    },
    /*
     ** Global CSS
     */
    css: [
        '~assets/css/main.css',
        '~assets/css/animate.css',
        '~assets/css/theme/index.css',
        '~assets/css/font-awesome/css/font-awesome.css'
    ],
    /**
     * Plugins
     */
    plugins: [
        '~plugins/axios',
        '~plugins/moment',
        { src: '~plugins/ga.js', ssr: false }
        // { src: '~plugins/echarts.js', ssr: false },
        // { src: '~plugins/bmap.js', ssr: false }
    ],
    /*
     ** Add axios globally
     */
    //external_library
    build: {
        analyze: false,
        vendor: ['axios', 'moment'],
        babel: {
            plugins: ['babel-plugin-transform-vue-jsx', 'babel-plugin-syntax-jsx', 'transform-async-to-generator', 'transform-runtime', ['component', [{
                'libraryName': 'element-ui',
                'styleLibraryName': '~assets/css/theme'
            }]]]
        },
        loaders: [{
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000, // 10KO
                    name: 'img/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(eot|svg|woff|woff2|[ot]tf)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000, // 10KO
                    name: 'fonts/[name].[hash].[ext]'
                }
            }
        ],
        postcss: [
            require('postcss-nested')(),
            require('postcss-hexrgba')(),
            require('postcss-cssnext')()
        ]
    },
    /**
     * add lru-cache support
     */
    cache: true
}