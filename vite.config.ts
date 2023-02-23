import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  base: '/wallet/',
  plugins: [react()],
  resolve: {
    alias: [
      // 解决vite less无法识别 @import ~别名问题
      { find: /^~/, replacement: '' },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
});
