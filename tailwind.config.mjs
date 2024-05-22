/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        focusin: {
          '0%': {
            transform: 'scale(1)',
            transformOrigin: '0% 0%',
          },
          '10%': {
            transform: 'scale(1)',
            transformOrigin: '30% 4%',
          },
          '20%': {
            transform: 'scale(1)',
            transformOrigin: '61% 8%',
          },
          '100%': {
            transform: 'scale(4)',
            transformOrigin: '61% 8%',
          },
        },
        shrink: {
          '0%': {
            width: '15rem',
            height: '15rem',
          },
          '100%': {
            width: '3.5rem',
            height: '3.5rem',
          }
        }
      },
      animation: {
        focusin: 'focusin 0.7s ease forwards',
        shrink: 'shrink 0.4s ease forwards',
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        navbar: {
          DEFAULT: "var(--nav-bar)",
          foreground: "var(--nav-bar-foreground)",
        },
      },
    }
  },
  plugins: [],
}
