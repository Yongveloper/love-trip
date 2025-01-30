module.exports = {
	"useTabs": true,
	"printWidth": 80,
	"tabWidth": 2,
	"singleQuote": true,
	"trailingComma": "all",
	"endOfLine": "lf",
	"semi": true,
	"arrowParens": "always",
	"plugins": [require.resolve("@trivago/prettier-plugin-sort-imports")],
	"importOrder": ["^react", "<THIRD_PARTY_MODULES>", "^~/(.*)$", "^[./]"],
	"importOrderSeparation": true,
	"importOrderSortSpecifiers": true
}
