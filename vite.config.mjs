import { defineConfig } from "vite";

export default  defineConfig({
    build: {
        target: 'ES2020'
    },
    css: {
        preprocessorOptions: {
            css: {
                api: 'modern-compiler', // or "modern", "legacy"
                importers: [
                  // ...
                ],
              },
        }
    }
});