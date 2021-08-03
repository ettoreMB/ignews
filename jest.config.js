module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: [
    "<rootDir/src/tests/setupTests.ts>"
  ],
  transform: {
    "^.\\.(jsx|tsx|ts|js)$": "<rootDir>/node_modules/babel-jest"
  },
  testEnviroment: 'jsdom'
};