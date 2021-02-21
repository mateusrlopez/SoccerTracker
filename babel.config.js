module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                }
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "@babel/plugin-proposal-decorators",
            {
                legacy: true,
            },
        ],
        [
            "module-resolver",
            {
                alias: {
                    "@auth": "./src/modules/auth",
                    "@config": "./src/config",
                    "@helpers": "./src/helpers",
                    "@password": "./src/modules/password",
                    "@shared": "./src/shared",
                    "@user": "./src/modules/user",
                },
            },
        ],
    ],
    ignore: [
        "**/*.spec.ts",
        "**/*.d.ts",
    ],
}
