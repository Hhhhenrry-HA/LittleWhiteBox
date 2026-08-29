import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const xiaobaiOsRoot = path.resolve('modules/xiaobai-os');

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

function createHostExternalPlugin() {
    return {
        name: 'xiaobai-os-host-externals',
        enforce: 'pre',
        resolveId(source, importer) {
            if (!importer || !source.startsWith('.')) return null;
            const resolved = path.resolve(path.dirname(importer), source);
            const relativeToOs = path.relative(xiaobaiOsRoot, resolved);
            const belongsToOs = relativeToOs === ''
                || (!relativeToOs.startsWith('..') && !path.isAbsolute(relativeToOs));
            return belongsToOs ? null : { id: resolved, external: true };
        },
    };
}

export default defineConfig(({ mode }) => {
    const buildAgent = mode === 'xiaobai-os-agent';
    const buildHost = mode === 'xiaobai-os-host';
    const buildShell = !buildAgent && !buildHost;
    const outputDirectory = path.resolve('modules/xiaobai-os/dist');
    return {
        plugins: [
            ...(buildAgent ? [createAgentCompatibilityPlugin()] : []),
            ...(buildHost ? [createHostExternalPlugin()] : []),
            ...(buildShell ? [vue()] : []),
            createEslintDisableBannerPlugin(),
        ],
        define: {
            'process.env.NODE_ENV': JSON.stringify('production'),
            global: 'globalThis',
        },
        build: {
            emptyOutDir: buildShell,
            outDir: outputDirectory,
            lib: {
                entry: path.resolve(
                    buildAgent
                        ? 'modules/xiaobai-os/apps/fourth-wall/agent/fourth-wall-agent.ts'
                        : buildHost
                            ? 'modules/xiaobai-os/index.ts'
                            : 'modules/xiaobai-os/shell/app-src/main.ts',
                ),
                formats: ['es'],
                fileName: () => {
                    if (buildAgent) return 'fourth-wall-agent.js';
                    if (buildHost) return 'xiaobai-os-host.js';
                    return 'xiaobai-os-app.js';
                },
                cssFileName: 'xiaobai-os-app',
            },
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                    paths: buildHost
                        ? (id) => {
                            if (!path.isAbsolute(id)) return id;
                            const relative = path.relative(outputDirectory, id).replace(/\\/g, '/');
                            return relative.startsWith('.') ? relative : `./${relative}`;
                        }
                        : undefined,
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
