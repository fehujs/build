const esbuild = require("esbuild")
const { existsSync, rmSync } = require("node:fs")

/**
 * @param {string[]} deps
 * @param {string} mainPath
 */
function build(deps, mainPath = "./src/index.ts") {
    if (existsSync('build'))
        rmSync('build', { recursive: true })
    
    esbuild.build({
        entryPoints: [mainPath],
        bundle: true,
        outfile: './build/index.js',
        platform: 'node',
        target: 'esnext',
        format: 'esm',
        sourcemap: true,
        tsconfig: './tsconfig.json',
        external: deps ? Object.keys(deps) : [],
    }).catch(() => process.exit(1))
    
}

module.exports = build
