import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        Asky:"#C3EBFA",
        Askylight:"#EDF9FD",
        Apurple:"#CFCEFF",
        Apurplelight:"#F1F0FF",
        Ayellow:"#FAE27C",
        Ayellowlight:"#FEFCE8",
        Ared:"#F23030",
        Aorange:"#F28705",
        AorangeLight:"#F29F05",
        AyellowA:"#F2CB05",
        AgreenD:"#267365",
      }
    },
  },
  plugins: [],
};
export default config;
