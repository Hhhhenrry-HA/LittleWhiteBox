import { readFileSync } from 'node:fs';

// The published tarball omits libraries/LICENSE. Keep the upstream release's
// exact text for both runtimes; remove this supplement when the package ships it.
const supplement = {
    name: 'standardwebhooks', version: '1.1.1',
    source: 'https://github.com/standard-webhooks/standard-webhooks/blob/b4d2c14fc5b4ccff3ff271e3b087dff812254c59/libraries/LICENSE',
    file: new URL('./licenses/standardwebhooks-1.1.1.txt', import.meta.url),
};

export function packageLicenseSupplement(metadata) {
    if (metadata.name !== supplement.name || metadata.version !== supplement.version) return undefined;
    return [{ name: supplement.source, text: readFileSync(supplement.file, 'utf8').trim() }];
}

export function createLicenseSupplementPlugin() {
    return {
        name: 'upstream-license-supplement',
        generateBundle(_, bundle) {
            const used = Object.values(bundle).some(item => item.type === 'chunk'
                && Object.keys(item.modules).some(id => id.replaceAll('\\', '/').includes(`/node_modules/${supplement.name}/`)));
            if (!used) return;
            const metadata = JSON.parse(readFileSync(new URL(`../../node_modules/${supplement.name}/package.json`, import.meta.url), 'utf8'));
            const files = packageLicenseSupplement(metadata);
            if (!files) return;
            this.emitFile({ type: 'asset', fileName: 'THIRD-PARTY-LICENSE-SUPPLEMENTS.txt',
                source: `${metadata.name}@${metadata.version}\n${files[0].name}\n\n${files[0].text}\n` });
        },
    };
}
