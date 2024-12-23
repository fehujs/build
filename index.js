const esbuild = require("esbuild")
const { existsSync, rmSync } = require("node:fs")

/**
 * @param {string} mainPath
 * @param {string} tsconfigPath
 */
function build(mainPath = "./src/index.ts", tsconfigPath = "../tsconfig.json") {
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
        tsconfig: tsconfigPath,
        preserveSymlinks: true,
        packages: "external",
    }).catch(() => process.exit(1))
    
}

module.exports = build
