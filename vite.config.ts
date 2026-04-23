import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    babel({
      filter: /\.[jt]sx?$/,
      include: ['src/**/*'],
      babelConfig: {
        presets: ['@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]],
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
});
