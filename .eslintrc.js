module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    extends: ["airbnb-base"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "no-console": "off",
        "linebreak-style": "off",
        "consistent-return": "off",
        "indent": 0,
        "import/no-cycle": "off",
        "func-names": "off",
        "no-use-before-define": "off",
        "import/prefer-default-export": "off",
        "max-len": "off",
    }
};