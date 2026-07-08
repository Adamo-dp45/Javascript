const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const  { CleanWebpackPlugin }  =  require ( 'clean-webpack-plugin' )
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require('autoprefixer');
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: {
        app: ['./src/app.js'],
        d3: './src/library/d3.js',
        curtainsjs: './views/transition en mosaïque avec curtainsjs/main.js',
        threejs: './src/library/three.js',
        reveal: './views/revealjs/app.js',
        jquery: './src/js/jquery.js',
        alpine: './src/library/alpine.js',
        lightgallery: './views/lightbox/lightgallery.js'
        // admin: ['./src/css/admin.scss', './src/admin.js']
    },
    // watch: true, -- Ou le faire dans la commande via '--watch'
    output: {
        path: path.resolve(__dirname, 'views/build'), 
        filename: '[name].js', // [chunkhash:8] - Permet de hasher
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                // use: ["style-loader", "css-loader"] -- On peut utiliser plusieurs loaders les uns sur les autres mais ces celui de droite qui sera utilisé en premier, 'css-loader' converti le css sous forme de chaîne de caractère, 'style-loader' injecte la chaîne de caractère dans une balise style
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"},
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer() // On peut lui passer des options '{}' comme les navigateur à visés
                                ]
                            }
                        }
                    },
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/inline"
            }
        ], 
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css', // '[chunkhash]' ne hash pas tant que les fichier utiliser pour généré n'ont pas changés, '[contenthash:8]' peut être aussi utile
        }),
        new WebpackManifestPlugin(),
        new CleanWebpackPlugin({
            dry: false, // Pour simuler la suppression de fichiers
            verbose: true // !! écrire les journaux sur la console 
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    ecma: 5,
                }
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    options: {
                        encodeOptions: {
                            jpeg: {
                                // https://sharp.pixelplumbing.com/api-output#jpeg
                                quality: 100,
                            },
                            webp: {
                                // https://sharp.pixelplumbing.com/api-output#webp
                                lossless: true,
                            },
                            avif: {
                                // https://sharp.pixelplumbing.com/api-output#avif
                                lossless: true,
                            },
                            // png by default sets the quality to 100%, which is same as lossless
                            // https://sharp.pixelplumbing.com/api-output#png
                            png: {},
                            // gif does not support lossless compression at all
                            // https://sharp.pixelplumbing.com/api-output#gif
                            gif: {},
                        },
                        /*  - Ou..
                            plugins: [
                                ["gifsicle", { interlaced: true }],
                                ["jpegtran", { progressive: true }],
                                ["optipng", { optimizationLevel: 5 }],
                                [
                                    "svgo",
                                    {
                                        plugins: [
                                            {
                                                name: "preset-default",
                                                params: {
                                                    overrides: {
                                                        removeViewBox: false,
                                                        addAttributesToSVGElement: {
                                                            params: {
                                                                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }]
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ] 
                                    }
                                ]
                            ]
                        */
                    },
                },
            }),
        ],
    },
    devServer: {
        /*
            static: { -- Pour définir le répertoire où se trouvent les fichiers statiques, pas très utile dans mon cas
                directory: path.join(__dirname, 'public')
            },
        */
        proxy: [
            {
                context: () => true, // Pour proxy toutes les requêtes
                target: 'http://localhost:8000', // Le point d'entrée
                changeOrigin: true,
                secure: false
            },
        ],
        headers: {
            'Access-Control-Allow-Origin': '*', // Permet l'accès 'CORS' depuis n'importe quelle origine
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
        },
        compress: true, // Pour activer la compression gzip pour les fichiers
        port: 8080, // !! définir le port sur lequel le serveur de développement écoutera
        hot: true, // !! activer le 'Hot Module Replacement'
        // open: true, -- !! ouvrir automatiquement le navigateur
        // historyApiFallback: true -- !! rediriger toutes les requêtes vers 'index.html' pour le routage côté client
    }
}