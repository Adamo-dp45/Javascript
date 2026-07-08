/*
    - npm install rollup
    - Plugins
        - 'rollup-plugin-styles' pour les styles
        - npm install @rollup/plugin-node-resolve --save-dev
*/
import { nodeResolve } from '@rollup/plugin-node-resolve'
// npm install @rollup/plugin-babel --save-dev
import { babel } from '@rollup/plugin-babel'
// npm install rollup-plugin-sass -D
import sass from 'rollup-plugin-sass'
import postcss from 'rollup-plugin-postcss'
import css from 'rollup-plugin-css-only'

export default {
    input: 'src/js/machine.js',
    output: {
        dir: 'js/dist',
        format: 'es' // 'cjs'
    },
    plugins: [
        nodeResolve(),
        postcss(),
        css({ output: 'app.css' }), // Permet de générer un fichier css séparé
        babel({
            babelHelpers: 'bundled',
            exclude: ['node_modules/**']
        }),
        /*
            sass({
                output: false, -- Default behavior disable output
                output: true, -- Write all styles to the bundle destination where .js is replaced by .css
                output: 'dist/app.css', -- Filename to write all styles

                - Callback that will be called on generate bundle with two arguments
                - styles: the concatenated styles in order of imported
                - styleNodes: an array of style objects:
                [
                    { id: './style1.scss', content: 'body { color: red };' },
                    { id: './style2.scss', content: 'body { color: green };' }
                ]
            })
        */
    ]
}

// npx rollup -c rollup.config.js .. --watch

/*
    - Ou.. gérer la config via un fichier js

    import { rollup } from 'rollup'
    import options from './rollup.config.js'
    async function build() {
        const bundle = await rollup(options)
        await bundle.generate(options.output)
    }
    build()
*/