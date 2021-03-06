module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        commonjs: true,
    },
    'extends': [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    parserOptions: {
        // ecmaVersion: 6,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
            arrowFunctions: true,
            classes: true,
            modules: true,
            defaultParams: true
        },
        sourceType: "module"
    },
    parser: "babel-eslint",
    plugins: [
        "react"
    ],
		"globals": {
        "url": true,
        "Swiper":true,
        "axios":true,
        "_axios": true,
        "eventEmitter":true,
        "_history":true,
				"log":true,
				"QRCode":true,
        "jQuery":true
    },
    rules: {
			'indent': ['error', 'tab'],
			'no-tabs': 0,
			'no-unused-vars': 1,
			'eqeqeq': 0,
			'no-new': 0,
			'react/prop-types':0,
			'react/no-string-refs':0,
			'no-console':0,
			'no-unused-labels':0,
			'react/no-direct-mutation-state':0,
			'no-mixed-spaces-and-tabs':0,
			'react/display-name':0
    }
}
