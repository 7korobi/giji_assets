const { is_windows } = require('./os')

module.exports = {
  testMatch: ['<rootDir>/__tests__/*.+(ts|tsx|js)'],
  moduleFileExtensions: ['js', 'yml'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transform: {
    '^.+\\.yml$': 'yaml-jest',
  },
}
