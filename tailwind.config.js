import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{json,jsx}',
        './resources/js/**/**/*.jsx',
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "dark-purple": "#081A51",
                "light-white": "rgba(255,255,255,0.17)",
              },
        },
    },

    plugins: [forms],
    darkMode: 'class',
};
