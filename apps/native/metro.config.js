const { getDefaultConfig } = require('expo/metro-config')
const path = require('node:path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// Watch all files within the monorepo
config.watchFolders = [workspaceRoot]

// Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// Force Metro to resolve (and bundle) files within the monorepo
config.resolver.extraNodeModules = {
  '@repo/features': path.resolve(workspaceRoot, 'packages', 'features'),
  '@repo/ui': path.resolve(workspaceRoot, 'packages', 'ui'),
  '@repo/api-client': path.resolve(workspaceRoot, 'packages', 'api-client'),
}

// Add support for .mjs files and prioritize TypeScript
config.resolver.sourceExts = ['ts', 'tsx', 'js', 'jsx', 'json', 'mjs']

// Ensure TypeScript files are resolved properly in monorepo
config.resolver.platforms = ['native', 'android', 'ios', 'web']

module.exports = config
