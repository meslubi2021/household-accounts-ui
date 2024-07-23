import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'red-1': '#fee2e2',
      'red-2': '#fecaca',
      'red-3': '#fca5a5',
      'white': '#ffffff'
    }
  },
  plugins: [],
};
export default config;
