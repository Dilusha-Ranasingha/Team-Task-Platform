# Tailwind CSS setup (v3.3.3) with PostCSS and tailwindcss-animate

This project is configured to use Tailwind CSS 3.3.3 with PostCSS, Autoprefixer, and the tailwindcss-animate plugin.

## What changed
- Removed: tailwindcss and @tailwindcss/postcss.
- Installed: tailwindcss@3.3.3, postcss, autoprefixer.
- Initialized config: tailwind.config.js and postcss.config.js.
- Added plugin: tailwindcss-animate.

## Install or reproduce
```bash
# Remove previous packages (if present)
npm uninstall tailwindcss @tailwindcss/postcss

# Install Tailwind 3.3.3 with PostCSS and Autoprefixer
npm install -D tailwindcss@3.3.3 postcss autoprefixer

# Create config files(that create tailwind.config.js and postcss.config.js files)
npx tailwindcss init -p

# Install animation plugin (prefer dev dependency)
npm install -D tailwindcss-animate
```
Note: If you installed tailwindcss-animate both as prod and dev, keep one (dev is recommended) and remove the other.

## Configure Tailwind
tailwind.config.js (adjust content paths to your project):
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}", "./index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};
```

postcss.config.js:
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Create your CSS entry (e.g., src/index.css):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
/* tailwindcss-animate adds utility classes automatically */
```
# This commite make the edit commite