module.exports = {
	env: {
		es6: true,
		jest: true,
	},
	extends: ['airbnb', 'prettier', 'react-native'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		__DEV__: 'readonly',
		fetch: false,
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', '@typescript-eslint/recommended'],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': [
			'off',
			{
				extensions: ['.jsx', '.js'],
			},
		],
		'import/prefer-default-export': 'off',
		'react/state-in-constructor': 'off',
		'react/static-property-placement': 'off',
		'react/jsx-props-no-spreading': 'off',
		'no-param-reassign': 'off',
		'no-console': 'off',
	},
	settings: {
		'import/resolver': {
			'babel-module': {},
		},
	},
};
