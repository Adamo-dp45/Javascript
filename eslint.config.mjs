import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([{
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: { /*
            - Les règles à appliquer
        */
        "no-unused-vars": "warn", // Pour avertir si une variable n'est pas utilisée
        "no-undef": "warn",
        "semi": ["error", "always"], // !! forcer l'usage des ';'
        "quotes": ["error", "double"], // !! les guillemets doubles
    }
}]);