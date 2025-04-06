// tailwind.config.mjs
export default {
	darkMode: 'class',
	content: [
	  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		aspectRatio: {
		  'card': '4 / 3',
		},
		minHeight: {
		  'card-image': '250px',
		},
		colors: {
		  background: "rgb(var(--background))",
		  foreground: "rgb(var(--foreground))",
		  primary: {
			DEFAULT: "rgb(var(--primary))",
			foreground: "rgb(var(--primary-foreground))"
		  },
		  secondary: {
			DEFAULT: "rgb(var(--secondary))",
			foreground: "rgb(var(--secondary-foreground))"
		  },
		  border: "rgb(var(--border))",
		  input: "rgb(var(--input))",
		  destructive: "rgb(var(--destructive))"
		},
		animation: {
		  'gradient-xy': 'gradient-xy 25s ease infinite',
		  'float': 'float 6s ease-in-out infinite',
		  'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		},
		keyframes: {
		  'gradient-xy': {
			'0%, 100%': { 'background-position': '0% 50%' },
			'50%': { 'background-position': '100% 50%' },
		  },
		  float: {
			'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
			'50%': { transform: 'translateY(-20px) rotate(5deg)' },
		  },
		  pulse: {
			'0%, 100%': { opacity: 1 },
			'50%': { opacity: 0.5 },
		  }
		},
		boxShadow: {
		  'primary': '0 8px 30px rgba(59, 130, 246, 0.15)',
		  'primary-hover': '0 12px 40px rgba(59, 130, 246, 0.25)',
		  'secondary-dark': '0 8px 30px rgba(239, 68, 68, 0.3)',
		  'secondary-dark-hover': '0 12px 40px rgba(239, 68, 68, 0.4)'
		},
		fontFamily: {
		  itim: ['Itim', 'cursive'],
		  montserrat: ['Montserrat', 'sans-serif']
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		backdropBlur: {
		  xs: '2px',
		  sm: '4px',
		  DEFAULT: '8px',
		  lg: '12px',
		  xl: '24px',
		}
	  }
	},
	plugins: [
	  require("tailwindcss-animate"),
	  require('@tailwindcss/typography'),
	]
  };