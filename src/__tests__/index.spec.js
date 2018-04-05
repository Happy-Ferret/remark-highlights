const remark = require(`remark`);
const plugin = require(`../index`);

const runTestWithPluginOptions = (code, options = {}) => {
  const markdownAST = remark.parse(code);
  plugin(options)(markdownAST);
  expect(markdownAST).toMatchSnapshot();
};

describe(`remark atom highlights plugin`, () => {
  it(`generates highlighted code`, () => {
    const code = `\`\`\`js
// Atom Highlights
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`does not blast off when no lang is provided`, () => {
    const code = `\`\`\`
// Atom Highlights
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`highlight code when language name is provided`, () => {
    const code = `\`\`\`javascript
// Atom Highlights
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`highlight code when filename name is provided`, () => {
    const code = `\`\`\`test.js
// Atom Highlights
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`inline scopePrefix`, () => {
    const code = `\`\`\`js{scopePrefix: "source--"}
// Atom Highlight
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`highlight codes from scope when scope is provided; it would try to use js even if rs is provided`, () => {
    const code = `\`\`\`rs{scopeName: "source.js"}
// Atom Highlight
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`highlight codes from addition langs when passed in inline config`, () => {
    const code = `\`\`\`rs{languagePackage: "language-rust"}
// Atom Highlight
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`loads grammars from inline config`, () => {
    const code = `\`\`\`rs{languagePackage: "language-rust"}
// Atom Highlight
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`highlight codes from scope when scope is provided and languagePackage is provided`, () => {
    const code = `\`\`\`html{scopeName:"source.rust", languagePackage:"language-rust"}
fn main() {}
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`should highlight line numbers`, () => {
    const code = `\`\`\`js{highlightLines: (1-2, 5)}
module.exports = (options) => (ast) => {
  console.log("This");
  console.log("is");
  console.log("a");
  console.log("test");
};
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`highlight when inline config is provided in single quote`, () => {
    const code = `\`\`\`js{scopePrefix: 'source--'}
// Atom Highlight
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`should replace pre class from inlineconfig`, () => {
    const code = `\`\`\`js{ preClass: { removeClass: true } }
// Atom Highlight with fileName
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`has codewraps when inline codewrapping is enabled`, () => {
    const code = `\`\`\`js{ codeWrap: true }
// Atom Highlights
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`has codewraps and fileicons when enabled in inline config`, () => {
    const code = `\`\`\`js{ codeWrap: true, showFileIcon: true  }
// Atom Highlights
\`\`\``;
    runTestWithPluginOptions(code);
  });

  it(`highlight codes from addition langs from plugin config`, () => {
    const code = `\`\`\`rs
// Atom Highlights
\`\`\``;
    const options = { additionalLangs: [`language-rust`] };
    runTestWithPluginOptions(code, options);
  });

  it(`has codewraps when codewrapping is enabled`, () => {
    const code = `\`\`\`js
// Atom Highlights
\`\`\``;
    const options = { codeWrap: true };
    runTestWithPluginOptions(code, options);
  });

  it(`has codewraps with specific class when codewrapping is enabled`, () => {
    const code = `\`\`\`js
// Atom Highlights
\`\`\``;
    const options = { codeWrap: { className: "midnight" } };
    runTestWithPluginOptions(code, options);
  });

  it(`override scopePrefix from config when inline config is provided`, () => {
    const code = `\`\`\`js{scopePrefix: ""}
// Atom Highlight
\`\`\``;
    const options = { scopePrefix: `source--` };
    runTestWithPluginOptions(code, options);
  });

  it(`should show filename`, () => {
    const code = `\`\`\`js
// Atom Highlight with fileName
\`\`\``;
    const options = { showFileName: true };
    runTestWithPluginOptions(code, options);
  });

  it(`should show fileicon`, () => {
    const code = `\`\`\`js
// Atom Highlight with fileName
\`\`\``;
    const options = { showFileIcon: true };
    runTestWithPluginOptions(code, options);
  });

  it(`should replace pre class from config`, () => {
    const code = `\`\`\`js
// Atom Highlight with fileName
\`\`\``;
    const options = { preClass: { removeClass: true } };
    runTestWithPluginOptions(code, options);
  });

  it(`should set custom pre class from config`, () => {
    const code = `\`\`\`js
// Atom Highlight with fileName
\`\`\``;
    const options = { preClass: { className: "foo bar" } };
    runTestWithPluginOptions(code, options);
  });
});
