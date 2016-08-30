module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "plugins": [
    ],
    "extends": [
        "eslint:recommended",
        ],
    "globals": {
    
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            2,
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": "off"
    }
};