const { defaults } = require(`lodash`);
const parseConfig = require(`simple-string-to-json`);

module.exports = (nodeLang, pluginOptions) => {
	let lang = nodeLang;

	const defaultPluginOptions = {
		additionalLangs: null,
		scopePrefix: null,
		codeWrap: false,
		showFileName: false, // File name is actually lang
		showFileIcon: false,
		preClass: false,
		wrapAll: false
	};

	let config = defaults(pluginOptions, defaultPluginOptions);

	if (!!lang && lang.split(`{`).length > 1) {
		const rangeStr = lang.substring(lang.indexOf(`(`) + 1, lang.indexOf(`)`));

		const modifiedRangeStr = rangeStr.replace(`,`, `&`).replace(` `, ``);

		const modifiedLang = lang.replace(rangeStr, modifiedRangeStr);

		const inlineConfig = modifiedLang.substring(modifiedLang.indexOf('{'));
		const parsedConfig = parseConfig(inlineConfig)
			.replace('(', `"`)
			.replace(`)`, `"`);

		config = Object.assign(config, JSON.parse(parsedConfig));

		if (!!config.highlightLines) {
			config.highlightLines = config.highlightLines.replace(`&`, `,`);
		}

		lang = modifiedLang.substring(0, modifiedLang.indexOf('{'));
	}

	config.lang = lang;
	return config;
};
