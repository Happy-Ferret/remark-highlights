# remark-highlights

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
    // scope prefix to use, defaults to ''
    scopePrefix: "syntax--",

    // Additional languages, useful if your language is not supported by default
    additionalLangs: ["language-rust"],

    codeWrap: {
      className: "midnight"
    }
  })
  .use(html)
  .process(/*your content*/);
```

### Use additional languages

If you want to use a language [that is not handled by default](https://github.com/atom/highlights/tree/master/deps),
you have to install a package yourself
E.g: to use Rust, you install `language-rust` package:

```console
npm install language-rust
```

Then you will have to specify it using `additionalLangs` option

### Adjust syntax theme (CSS styles/colors)

This highlighter is using [Atom highlights](https://github.com/atom/highlights).
So to get a nice CSS theme, you can just [choose an Atom theme](https://www.atom.io/themes)

Note: Atom themes are [less](http://lesscss.org) files so a compilation is required.

Rename `atom-text-editor` to `editor` and remove every instance of `syntax--`

(optional; if you don't want to do that just set the scopePrefix to `syntax--`) in the theme files.
