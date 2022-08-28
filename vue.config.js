const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	devServer: {
		port: 3200,
	},
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "@/styles/scss/helpers/variables.scss";`,
			},
		},
	},
});
