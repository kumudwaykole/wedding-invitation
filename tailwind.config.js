/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: "#fdf8f0",
                ivory: "#faf5eb",
                gold: "#c9a84c",
                "gold-light": "#e8c96a",
                "gold-dark": "#a07830",
                "deep-red": "#8b1a1a",
                blush: "#f5e6d3",
                green: "#4a7c59",
                "green-light": "#6fa882",
                navy: "#1a2744",
                brown: "#3b2f2f",
            },
            fontFamily: {
                script: ["Great Vibes", "cursive"],
                serif: ["Cormorant Garamond", "serif"],
                display: ["Playfair Display", "serif"],
                body: ["Raleway", "sans-serif"],
            },
        },
    },
    plugins: [],
};