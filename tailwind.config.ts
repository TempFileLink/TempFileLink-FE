import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
