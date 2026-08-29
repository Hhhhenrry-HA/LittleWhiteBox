import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

function createEslintDisableBannerPlugin() {
    return {
        name: 'xiaobai-os-eslint-disable-banner',
        generateBundle(_options, bundle) {
            Object.values(bundle).forEach((item) => {
                if (item.type === 'chunk' && typeof item.code === 'string' && !item.code.startsWith('/* eslint-disable */')) {
                    item.code = `/* eslint-disable */\n${item.code}`;
                }
            });
        },
    };
}

function createAgentCompatibilityPlugin() {
    return {
        name: 'xiaobai-os-agent-compatibility',
        transform(code, id) {
            const normalizedId = id.replace(/\\/g, '/');
            if (normalizedId.includes('/retry/lib/retry_operation.js')) {
                return {
                    code: code
                        .replace("  console.log('Using RetryOperation.try() is deprecated');\n", '')
                        .replace("  console.log('Using RetryOperation.start() is deprecated');\n", ''),
                    map: null,
                };
            }
            if (normalizedId.includes('/openai/_vendor/partial-json-parser/parser.mjs')) {
                return {
                    code: code.replace(
                        "while (index < length && ' \\n\\r\\t'.includes(jsonString[index])) {",
                        'while (index < length && [32, 10, 13, 9].includes(jsonString.charCodeAt(index))) {',
                    ),
                    map: null,
                };
            }
            return null;
        },
    };
}

export default defineConfig(({ mode }) => {
    const buildAgent = mode === 'xiaobai-os-agent';
    return {
        plugins: [
            ...(buildAgent ? [createAgentCompatibilityPlugin()] : [vue()]),
            createEslintDisableBannerPlugin(),
        ],
        define: {
            'process.env.NODE_ENV': JSON.stringify('production'),
            global: 'globalThis',
        },
        build: {
            emptyOutDir: !buildAgent,
            outDir: path.resolve('modules/xiaobai-os/dist'),
            lib: {
                entry: path.resolve(buildAgent
                    ? 'modules/xiaobai-os/apps/fourth-wall/agent/fourth-wall-agent.js'
                    : 'modules/xiaobai-os/shell/app-src/main.ts'),
                formats: ['es'],
                fileName: () => buildAgent ? 'fourth-wall-agent.js' : 'xiaobai-os-app.js',
                cssFileName: 'xiaobai-os-app',
            },
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                },
            },
            modulePreload: false,
            cssCodeSplit: false,
            target: 'es2022',
            minify: 'esbuild',
            sourcemap: false,
        },
    };
});
