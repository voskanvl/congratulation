import vitePugPlugin from "vite-plugin-pug-transformer"
import { defineConfig } from "vite"
import * as yaml from "js-yaml"
import sassGlobImports from "vite-plugin-sass-glob-import"
import { resolve, extname, posix } from "path"
import { readFileSync, readdirSync } from "fs"

function YamlHMR() {
    return {
        name: "yaml-hmr",
        enforce: "post",
        // HMR
        handleHotUpdate({ file, server }) {
            if (file.endsWith(".yml") || file.endsWith(".yaml")) {
                console.log("reloading data file...")
                server.ws.send({
                    type: "full-reload",
                    path: "*",
                })
            }
        },
    }
}

const merge = () => {
    console.log(`now merging data files`)
    const fn = { json: JSON.parse, yaml: yaml.load, yml: yaml.load }
    const files = readdirSync(resolve(__dirname, "src/data"))
    return files.reduce(
        (acc, file) => ({
            ...acc,
            ...fn[extname(file).slice(1)](readFileSync(resolve(__dirname, "src/data", file))),
        }),
        {},
    )
}

export default defineConfig({
    plugins: [YamlHMR(), vitePugPlugin({ pugLocals: { ...merge() } }), sassGlobImports()],
    build: {
        rollupOptions: {},
    },
    publicDir: "./assets",
})
