module.exports = {
    entry: {
        app: './rxjs-ajax.ts'
    },
    output: {
        path: './dist',
        filename:'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                loader: 'ts-loader',
            }
        ]
    }
}