import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier'; // 추가
import eslintConfigPrettier from 'eslint-config-prettier'; // 추가

export default tseslint.config(
	{
		ignores: [
			'dist',
			'.yarn/**/*', // Yarn SDK 파일들 무시
			'.pnp.*', // PnP 파일들 무시
		],
	},
	eslintConfigPrettier,
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			prettier: prettier, // 추가
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'prettier/prettier': 'error', // 추가
		},
	},
);
