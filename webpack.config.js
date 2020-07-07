module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|png|jp?g|css)$/,
        exclude: [
	  /node_modules/
	],
	resolve: {
	  extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
        use: [
	  {loader: "file-loader"},
          {loader: "babel-loader"}
	]
      }
    ]
  }
};
