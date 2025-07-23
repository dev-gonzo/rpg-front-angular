const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",

        primary: "var(--color-primary)",
        "primary-contrast": "var(--color-primary-contrast)",

        secondary: "var(--color-secondary)",
        "secondary-contrast": "var(--color-secondary-contrast)",

        surface: "var(--color-surface)",
        "surface-contrast": "var(--color-surface-contrast)",

        muted: "var(--color-muted)",
        border: "var(--color-border)",
      },
      extend: {
        fontSize: {
          base: "var(--font-size-base)",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".theme-primary": {
          backgroundColor: "var(--color-primary)",
          color: "var(--color-primary-contrast)",
        },
        ".theme-secondary": {
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-secondary-contrast)",
        },
        ".theme-surface": {
          backgroundColor: "var(--color-surface)",
          color: "var(--color-surface-contrast)",
        },
        ".theme-background": {
          backgroundColor: "var(--color-background)",
          color: "var(--color-foreground)",
        },
      });
    }),
  ],
};
