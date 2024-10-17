/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',  // Ensure Tailwind scans your project files for class usage
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1D4ED8',  // Custom primary color (blue)
          secondary: '#FBBF24',  // Custom secondary color (yellow)
          danger: '#DC2626',  // Custom danger color (red)
          success: '#10B981',  // Custom success color (green)
          dark: '#1E293B',  // Dark color for text or background
          light: '#F3F4F6',  // Light color for background
          contrast: '#000000',  // High contrast black for accessibility
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],  // Custom font family using Poppins
        },
        spacing: {
          '72': '18rem',  // Custom spacing value (e.g., for large sections)
          '84': '21rem',
          '96': '24rem',
        },
        borderRadius: {
          'lg': '1rem',  // Larger border radius for buttons and containers
          'xl': '1.5rem',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),  // Plugin for better form styling
      require('@tailwindcss/typography'),  // Plugin for rich text formatting
    ],
  };
  