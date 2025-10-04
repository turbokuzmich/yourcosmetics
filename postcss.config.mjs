/**
 * Important note about postcss-clampwind!
 *
 * In order to make clampwind work, you should hack
 * /node_modules/postcss-clampwind/dist/clampwind.cjs.cjs
 * file and add the following code at the end of the file:
 *
 * module.exports = clampwind_default;
 */

const config = {
  plugins: ["@tailwindcss/postcss", "postcss-clampwind"],
};

export default config;
