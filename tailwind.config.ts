import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			"blue-dark": "#0583F2",
			"blue-medium":"#0597F2",
			"blue-light":"#57B7F2",
			"grey-medium":"#565659",
			"grey-light":"#F2F2F2",
			"font-black":"#29292A"
  		},
  		backgroundImage: {
			"girl-banner": "url('/assets/img/woman-dentist.jpg')"
		  },
		  keyframes: {
			"accordion-down": {
			  from: { height: "0" },
			  to: { height: "var(--radix-accordion-content-height)" },
			},
			"accordion-up": {
			  from: { height: "var(--radix-accordion-content-height)" },
			  to: { height: "0" },
			},
			"caret-blink": {
			  "0%,70%,100%": { opacity: "1" },
			  "20%,50%": { opacity: "0" },
			},
		  },
		animation: {
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
			"caret-blink": "caret-blink 1.25s ease-out infinite",
		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
