module.exports = {
    root: true,
    extends: [
        'airbnb-base',
        'plugin:react/recommended'
    ],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    plugins: ['react', 'react-hooks'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true
        }
    },
    rules: {
        // off
        'no-use-before-define': 0,
        'no-console': 0,
        'no-alert': 0,
        'no-plusplus': 0,
        'no-unused-expressions': 0,
        'func-names': 0,
        eqeqeq: 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-new': 0,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'linebreak-style': 0,
        'no-nested-ternary': 0,
        'arrow-body-style': 0,
        'prefer-const': 0,
        'import/no-dynamic-require': 0,
        'global-require': 0,
        'import/extensions': 0,
        'prefer-arrow-callback': 0,

        // warn
        'import/prefer-default-export': 1,
        'no-unused-vars': 1,

        // error
        indent: [2, 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1
            },
            FunctionExpression: {
                parameters: 1,
                body: 1
            }
        }],
        // 'space-before-function-paren': [2, 'never'],
        'wrap-iife': [2, 'inside', { functionPrototypeMethods: true }],
        'comma-dangle': [2, 'never'],
        'max-len': [2, 120, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }],

        // react
        'react/jsx-no-undef': 2,
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react-hooks/rules-of-hooks': 2,
        // 使用后会添加不希望出现的变量到依赖
        // 'react-hooks/exhaustive-deps': 1,
        'react/jsx-max-props-per-line': [2, { maximum: 1 }],
        'react/jsx-closing-bracket-location': 2,
        'react/jsx-closing-tag-location': 2,
        'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
        'react/jsx-wrap-multilines': [2, {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'ignore',
            logical: 'ignore',
            prop: 'ignore'
        }],
        'react/jsx-no-duplicate-props': 2,
        //   'react/jsx-one-expression-per-line': 2,

        // no debugger
        'no-debugger': 2,

        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }], // 允许js文件写jsx语法
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'react/jsx-no-target-blank': 0
    }
};
