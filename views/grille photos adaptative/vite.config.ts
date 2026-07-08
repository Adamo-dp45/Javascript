import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import {presetIcons, presetTypography, presetUno} from "unocss";

export default defineConfig({
    base: "./",
    plugins: [
        UnoCSS({
            presets: [
              presetUno(),
              presetIcons(),
            ],
            theme: {
                container: {
                    padding: '1rem',
                    center: true,
                }
            }
        }),
    ],
})
