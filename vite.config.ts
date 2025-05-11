import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        '@reown/appkit-adapter-wagmi/*/AuthConnector',
      ],
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            'framer-motion',
            'ethers',
          ],
          wagmi: [
            'wagmi',
            '@wagmi/core',
          ],
        },
      },
    },
    sourcemap: false,
    commonjsOptions: {
      esmExternals: true,
    },
  },
});
