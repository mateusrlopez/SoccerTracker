const unitConfig = require("../jest.config");

module.exports = {
    ...unitConfig,
    ...{
        displayName: "E2E Tests",
        rootDir: "..",
        testMatch: ["<rootDir>/test/**/*.e2e-spec.ts"],
    }
};
