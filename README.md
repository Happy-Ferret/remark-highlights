# remark-highlights

[![Build Status](https://travis-ci.org/MoOx/remark-highlights.svg?branch=master)](https://travis-ci.org/MoOx/remark-highlights)

This [remark](https://remark.js.org) plugin allows you to highlight code snippets
in markdown files using [Atom highlights](https://github.com/atom/highlights).

🎉 It supports all the language grammar files that are made for Atom!

[Atom packages: #language](https://atom.io/packages/search?utf8=✓&q=keyword:language)

## Install

```console
npm install remark-highlights
```

## Usage

```js
const remark = require("remark");
const highlights = require("remark-highlights");
const html = require("remark-html");

remark()
  .use(highlights, {
    // Additional languages, useful if your language is not supported by default
    additionalLangs: ["language-rust"]
    // ...more option in docs below
  })
  .use(html)
  .process(/*your content*/);
```

### Options

#### `additionalLangs: Array<string>` (default: `[]`)

If you want to use a language [that is not handled by default](https://github.com/atom/highlights/tree/master/deps),
you have to install a package yourself
E.g: to use Rust, you install `language-rust` package:

```console
npm install language-rust
```

Then provide the name of the package to this option.

#### `scopePrefix: string` (default: `syntax--`)

Allows you to change the prefix of language scope CSS class.

#### `codeWrap` (default: `false`)

Allows you to add an additional wrapper around the `<pre>` tag with some attributes.
You can send an object like `{className: "myclass"}`.

Passing `true` will use `{className: "highlight"}`.

#### `showFileName` (default: `false`)

Allows you to append filename before the `<pre>` tag.

#### `showFileIcon` (default: `false`)

Allows you to append icon class before the `<pre>` tag.
This will require an Atom theme that support icons.

#### `preClass` (default: `"editor editor-colors"` (highlights default))

Object to specify a class for the `<pre>` tag surrounding the code.
Set to `false` to remove the class completely.

#### `wrapAll` (default: `false`)

Allows to wrap the all result (including filename, icon and code).

### Adjust syntax theme (CSS styles/colors)

This highlighter is using [Atom highlights](https://github.com/atom/highlights).
So to get a nice CSS theme, you can just [choose an Atom theme](https://www.atom.io/themes)

Note: Atom themes are [less](http://lesscss.org) files so a compilation is required.

➡️ The easiest way to quickly get an CSS is to rely on [atom-syntax-theme-to-highlights-css](https://github.com/MoOx/atom-syntax-theme-to-highlights-css).

```console
npx atom-syntax-theme-to-highlights-css --clipboard <repository>
```

Example

```console
npx atom-syntax-theme-to-highlights-css --clipboard https://github.com/simurai/duotone-dark-sea-syntax
```
