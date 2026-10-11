# All In One feature website

[Open the feature catalogue](https://nexatone.github.io/mc-all-in-one-site/).

This public repository contains the generated website for the All In One Minecraft Bedrock add-on. Browse all 27 currently documented features with full expandable guides, search, category filters, and installation instructions.

The add-on source and release downloads live in the private [Nexatone/mc-all-in-one](https://github.com/Nexatone/mc-all-in-one) repository. Those GitHub links require repository access. This repository contains no deployable behavior pack, resource pack, server configuration, or credentials.

## Updating the website

The private add-on repository owns the authored website template, category map, Markdown documents, and `tools/site/build.py`. Build there, or download its validated `all-in-one-feature-website` Actions artifact, then replace this repository's generated `site/` files with the result. Preserve hidden `.nojekyll` and the deployment workflow, review, commit, and push the website update.

Every push to `main` runs **Publish website** and deploys only `site/`. Repository Settings → Pages uses **GitHub Actions**. The workflow reports the published URL in its `github-pages` environment. `site/site-build.json` records the add-on version, source reference, feature count, and source hashes.

Open `site/index.html` directly for an offline preview of the catalogue. For a local HTTP preview, run `python -m http.server 8765 --bind 127.0.0.1 --directory site` and visit `http://127.0.0.1:8765/`.

An independent community add-on; not an official Minecraft product and not approved by or associated with Mojang or Microsoft.
