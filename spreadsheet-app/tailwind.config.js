// tailwind.config.js

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',    // Include all files in the `pages` directory
    './components/**/*.{js,ts,jsx,tsx}', // Include all files in the `components` directory
    './app/**/*.{js,ts,jsx,tsx}', // Include all files in the `app` directory if using App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
