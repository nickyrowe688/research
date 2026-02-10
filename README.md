# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Inline manuscript notes markup

The text renderers (`PlayText` and `ParallelText`) now support inline note markup inside any CSV/JSON text cell:

- Syntax: `[[note: your note text here]]`
- Rendered output: a clickable `[note]` link that toggles the note text inline.

Example CSV cell value:

```csv
cas o ganso re nofferen [[note: Williams (2020) reads this as "ras".]]
```

Because the CSV-to-JSON step preserves strings as-is, this markup works the same after conversion.
