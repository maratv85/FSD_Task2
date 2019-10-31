const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: {
	  app: '.src/index.js'
	},
    output: {
      filename '[name].js',
	  path: path.resolve(__dirname, './dist'),
	  publicPath: './dist'
    },
	  
	module: {
		  rules:[{
			  test: /\.css$/.
			  use: [
			  'style-loader',
			    MiniCssExtractPlugin.loader,
				{
				loader: 'css-loader',
			    options: {sourcemap: true}
                }				
				]
		  }]
	},	  
		  	devServer: {
      overlay: true
    },
	plugins: [
	  new MiniCssExtractPlugin({
		    filename: "[name].css",
			chunkFilename: "[id].css"
	  })
	  ],
}	
	