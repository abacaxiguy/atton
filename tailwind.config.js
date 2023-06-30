/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    500: "#F16F25",
                },
                dark: {
                    500: "#202124",
                },
            },
            animation: {
                "fade-up": "fadeUp 0.7s ease-in-out",
            },
            keyframes: {
                fadeUp: {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(20px)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                    },
                },
            },
        },
    },
    plugins: [],
};
