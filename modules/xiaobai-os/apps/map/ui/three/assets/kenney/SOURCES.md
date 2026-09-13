# Map scene pilot assets

Author: Kenney. Retrieved 2026-09-13. Both packs are CC0; the original license files are preserved beside the models. Only the six prepared models are shipped, not the full packs.

| Pack (version from archive) | Official source | Archive SHA-256 |
| --- | --- | --- |
| Furniture Kit 2.0 | https://kenney.nl/assets/furniture-kit | `E67652D0932CEE41683F74711C03D3E192A2AF9979EF8E6B237711F5482D46B0` |
| Nature Kit 2.1 | https://kenney.nl/assets/nature-kit | `FA7974A0D342BFE63C38664BA9F8EC1A4AAB8EA25F099BDC56870E33588C4D9D` |

Archive downloads used:

- https://kenney.nl/media/pages/assets/furniture-kit/440e0608a4-1677580847/kenney_furniture-kit.zip
- https://kenney.nl/media/pages/assets/nature-kit/37ac38a37b-1677698939/kenney_nature-kit.zip

Extract the packs into `furniture/` and `nature/` under an offline working directory, then run from the repository root:

```sh
node scripts/prepare-map-scene-assets.mjs <working-directory>
```

The script bakes node transforms, centers the footprint, grounds the mesh, merges surfaces into semantic material roles, and generates local planar UVs. It emits static GLBs without textures, external URIs, cameras, lights or animations. Runtime materials come from the existing map material tokens. `manifest.json` records original filenames, original/prepared file hashes, bounds and geometry budgets.

Chair backs and the bed headboard face north at zero rotation. Shelves repeat empty structural bays inside the authored footprint. Tree and rock circles use the complete mesh's radial bound, not a square bounding box. Unsupported shapes/proportions use existing procedural shapes.
