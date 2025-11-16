import { FlatCompat } from '@eslint/eslintrc'
import pluginPrettier from 'eslint-plugin-prettier'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends(
		'next/core-web-vitals',
		'next/typescript',
		'airbnb',
		'airbnb-typescript',
		'plugin:prettier/recommended',
		'prettier'
	),
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'next-env.d.ts',
			'prettier.config.cjs',
			'eslint.config.mjs',
		],
	},
	{
		files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: ['./tsconfig.json'],
				tsconfigRootDir: __dirname,
			},
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'],
				},
			},
			react: {
				version: 'detect',
			},
		},
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			'prettier/prettier': 'error',
			'import/prefer-default-export': 'off',

			'react/react-in-jsx-scope': 'off',
			'react/jsx-props-no-spreading': 'off',

			'import/order': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						['internal'],
						['parent', 'sibling', 'index'],
						['type'],
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
					pathGroups: [
						{ pattern: '@/**', group: 'internal', position: 'before' },
					],
					pathGroupsExcludedImportTypes: ['builtin'],
				},
			],

			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'error',
		},
	},
]

export default eslintConfig
