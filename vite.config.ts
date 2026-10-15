import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: { home: 'index.html', about: 'about.html' },
        },
    },
});
