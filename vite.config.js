import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    import.meta.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [
            laravel({
                input: 'resources/js/app.tsx',
                refresh: true,
            }),
            react()
        ],
        css:
        {
            preprocessorOptions: {
                scss: {
                    additionalData: `$base_color: ` + import.meta.env.VITE_BASE_COLOR + '; $secondary_color: ' + process.env.VITE_SECONDARY_COLOR + ';'
                }
            }
        }
    });
}

