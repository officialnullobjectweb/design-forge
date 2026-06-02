# Contributing to Numb.Design

Thanks for your interest! Numb.Design is 100% free and open-source (MIT). Whether you're fixing a bug, adding a resource, or improving docs — you're welcome here.

## Ways to Contribute

### Add a Resource to the Catalog

The catalog lives in `src/data/`. Each resource is a structured entry with name, description, category, URL, and tags. PRs that add high-quality free resources are always welcome.

### Improve the CLI

The CLI is at `packages/numb-design/bin/cli.js`. Keep commands simple, outputs clean, and error messages helpful. Run `node packages/numb-design/bin/cli.js --help` to test.

### Fix a Bug or Add a Feature

Check the [open issues](https://github.com/officialnullobjectweb/Numb.design/issues) for bugs and feature requests tagged `good first issue`.

### Improve Documentation

Docs live at `src/app/docs/page.tsx` and `README.md`. Clear, accurate docs are as valuable as code.

## Good First Issues

- Add new free resources to the catalog (icons, fonts, UI components, etc.)
- Improve error messages in the CLI when a command fails
- Add missing vendor URLs or credits to existing resources
- Fix responsive layout issues on the docs page
- Add more categories to the CLI `search` command filter
- Write unit tests for the core API (`packages/numb-design/index.js`)

## Pull Request Guidelines

1. Keep changes focused — one PR per feature or fix
2. Test your changes: `npm run build` in the root, `node packages/numb-design/bin/cli.js --help` for CLI
3. Update docs if your change affects the user-facing interface
4. Follow existing code style (no semicolons, 2-space indent in JS)

## Questions?

Open a [discussion](https://github.com/officialnullobjectweb/Numb.design/discussions) or an issue.
