const visit = require(`unist-util-visit`);
const Highlights = require(`highlights`);
const highlightNode = require(`./utils/highlightNode`);
const loadGrammars = require(`./utils/loadGrammars`);
const wrapNode = require(`./utils/wrapNode`);
const constructConfig = require(`./utils/constructConfig`);
const highlightLines = require(`./utils/highlightLines`);

module.exports = (options) => (ast) => {
	visit(ast, `code`, node => {
		const config = constructConfig(node, options);

		const highlighter = new Highlights(({ scopePrefix } = config));

		node.type = `html`;
		node.value = [loadGrammars, highlightNode, highlightLines, wrapNode].reduce(
			(a, f) => f(a, config),
			highlighter
		);
	});
};
