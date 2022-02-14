module.exports = {
  purge: ["./index.html", "./src/**/*"],
  theme: {
    extend: {
      colors: {
        ...require("tailwindcss/colors"),
        gray: require("tailwindcss/colors").coolGray,
      },
      fontFamily: {
        sans: '"Trebuchet MS", "Lucida Grande", sans-serif',
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),
  },
  plugins: [require("@tailwindcss/typography")],
};
