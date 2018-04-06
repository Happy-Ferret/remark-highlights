const remark = require(`remark`);
const plugin = require(`../index`);

const run = (options = {}, code) => {
  const markdownAST = remark.parse(code);
  plugin(options)(markdownAST);
  expect(markdownAST).toMatchSnapshot();
};

describe(`remark atom highlights plugin`, () => {
  it(`generates highlighted code`, () => {
    run(
      {},
      `\`\`\`js
// Atom Highlights
\`\`\``
    );
  });

  it(`does not blast off when no lang is provided`, () => {
    run(
      {},
      `\`\`\`
// Atom Highlights
\`\`\``
    );
  });

  it(`highlight code when language name is provided`, () => {
    run(
      {},
      `\`\`\`javascript
// Atom Highlights
\`\`\``
    );
  });

  it(`highlight code when filename name is provided`, () => {
    run(
      {},
      `\`\`\`test.js
// Atom Highlights
\`\`\``
    );
  });

  it(`inline scopePrefix`, () => {
    run(
      {},
      `\`\`\`js{scopePrefix: "source--"}
// Atom Highlight
\`\`\``
    );
  });

  it(`highlight codes from scope when scope is provided; it would try to use js even if rs is provided`, () => {
    run(
      {},
      `\`\`\`rs{scopeName: "source.js"}
// Atom Highlight
\`\`\``
    );
  });

  it(`highlight codes from addition langs when passed in inline config`, () => {
    run(
      {},
      `\`\`\`rs{languagePackage: "language-rust"}
// Atom Highlight
\`\`\``
    );
  });

  it(`loads grammars from inline config`, () => {
    run(
      {},
      `\`\`\`rs{languagePackage: "language-rust"}
// Atom Highlight
\`\`\``
    );
  });

  it(`highlight codes from scope when scope is provided and languagePackage is provided`, () => {
    run(
      {},
      `\`\`\`html{scopeName:"source.rust", languagePackage:"language-rust"}
fn main() {}
\`\`\``
    );
  });

  it(`should highlight line numbers`, () => {
    run(
      {},
      `\`\`\`js{highlightLines: (1-2, 5)}
module.exports = (options) => (ast) => {
  console.log("This");
  console.log("is");
  console.log("a");
  console.log("test");
};
\`\`\``
    );
  });

  it(`highlight when inline config is provided in single quote`, () => {
    run(
      {},
      `\`\`\`js{scopePrefix: 'source--'}
// Atom Highlight
\`\`\``
    );
  });

  it(`should replace pre class from inlineconfig`, () => {
    run(
      {},
      `\`\`\`js{ preClass: { removeClass: true } }
// Atom Highlight with fileName
\`\`\``
    );
  });

  it(`has codewraps when inline codewrapping is enabled`, () => {
    run(
      {},
      `\`\`\`js{ codeWrap: true }
// Atom Highlights
\`\`\``
    );
  });

  it(`has codewraps and fileicons when enabled in inline config`, () => {
    run(
      {},
      `\`\`\`js{ codeWrap: true, showFileIcon: true  }
// Atom Highlights
\`\`\``
    );
  });

  it(`highlight codes from addition langs from plugin config`, () => {
    run(
      { additionalLangs: [`language-rust`] },
      `\`\`\`rs
// Atom Highlights
\`\`\``
    );
  });

  it(`has codewraps when codewrapping is enabled`, () => {
    run(
      { codeWrap: true },
      `\`\`\`js
// Atom Highlights
\`\`\``
    );
  });

  it(`has codewraps with specific class when codewrapping is enabled`, () => {
    run(
      { codeWrap: { className: "midnight" } },
      `\`\`\`js
// Atom Highlights
\`\`\``
    );
  });

  it(`override scopePrefix from config when inline config is provided`, () => {
    run(
      { scopePrefix: `source--` },
      `\`\`\`js{scopePrefix: ""}
// Atom Highlight
\`\`\``
    );
  });

  it(`should show filename`, () => {
    run(
      { showFileName: true },
      `\`\`\`js
// Atom Highlight with fileName
\`\`\``
    );
  });

  it(`should show fileicon`, () => {
    run(
      { showFileIcon: true },
      `\`\`\`js
// Atom Highlight with fileName
\`\`\``
    );
  });

  it(`should replace pre class from config`, () => {
    run(
      { preClass: false },
      `\`\`\`js
// Atom Highlight with fileName
\`\`\``
    );
  });

  it(`should set custom pre class from config`, () => {
    run(
      { preClass: "foo bar" },
      `\`\`\`js
// Atom Highlight with fileName
\`\`\``
    );
  });
});
