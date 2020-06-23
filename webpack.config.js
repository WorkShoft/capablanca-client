module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|png|jp?g|css)$/,
        exclude: [
	  /node_modules/
	],
        use: [
	  {loader: "file-loader"},
          {loader: "babel-loader"}
	]
      }
    ]
  }
};
