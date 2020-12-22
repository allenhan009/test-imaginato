module.exports = {
	env: {
		browser: false,
		es6: true,
		node: true
	},
	extends: ["eslint:recommended", "google", 'prettier'],
	globals: {
		async: true,
		server: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: ['prettier'],
	rules: {
		'no-use-before-define': ['warn', { functions: false, classes: false }],
		'no-unused-vars': 'warn',
		'no-console': 'warn'
	}
};
