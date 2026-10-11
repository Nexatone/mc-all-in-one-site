# All In One feature website

[Open the feature catalogue](https://nexatone.github.io/mc-all-in-one-site/).

This public repository contains the generated feature page for the All In One Minecraft Bedrock add-on. Browse all 27 features with short overviews, expandable player descriptions, crafting diagrams, equipment artwork, and grave and skin previews. Search and category filters help you find what interests you.

The minimal dark layout uses smoked-glass surfaces and rounded controls. Phone screens use a single feature column and scrollable category chips. Native expandable cards work without JavaScript, and keyboard focus, reduced-motion preferences, and an opaque glass fallback remain supported.

Each feature tile displays a green Enabled or amber Disabled badge for availability in the mod. These badges do not represent a player's personal settings. The private source catalogue owns each feature's explicit availability flag.

Double Creeper Drops is disabled. Its tile remains visible and explains that creepers use normal gunpowder, Looting, music-disc, and experience behavior.

The add-on source lives in the private [Nexatone/mc-all-in-one](https://github.com/Nexatone/mc-all-in-one) repository. This website is a player feature overview; installation and maintainer details are kept separately. This repository contains the website and its supporting artwork.

## Updating the website

The private add-on repository owns the authored website template, category map, curated player descriptions in `website/features.json`, and `tools/site/build.py`. Player copy is reviewed against the focused feature documents. Crafting visuals use the actual pack recipes. Build there, or download its validated `all-in-one-feature-website` Actions artifact, then replace this repository's generated `site/` files with the result. Preserve hidden `.nojekyll` and the deployment workflow, review, commit, and push the website update.

Every push to `main` runs **Publish website** and deploys only `site/`. Repository Settings → Pages uses **GitHub Actions**. The workflow reports the published URL in its `github-pages` environment. The build receipt stays outside the publicly served site.

Open `site/index.html` directly for an offline preview of the catalogue. For a local HTTP preview, run `python -m http.server 8765 --bind 127.0.0.1 --directory site` and visit `http://127.0.0.1:8765/`.

An independent community add-on; not an official Minecraft product and not approved by or associated with Mojang or Microsoft.
