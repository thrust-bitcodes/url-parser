let REPLACE_RULES = [
	{
		regex: [/^\/$/], //Trata url '/', que só pode fazer match com '/'
		replace: '^\/$'
	},
	{
		regex: [/(\:\w+)/g, /\*/g], //Trata urls com :parametro e *
		replace: '.+'
	},
	{
		regex: [/(\/)/g],
		replace: '\\$&'
	}
];

function sortByLength(urls) {
	let sortFn = function (a, b) {
		return a.length < b.length;
	};

	if (urls.constructor.name === 'Array') {
		return urls.sort(sortFn);
	} else {
		return Object.keys(urls).sort(sortFn);
	}
}

function buildUrlRegex(url) {
	return REPLACE_RULES.reduce(function (url, subs) {
		return subs.regex.reduce(function (url, regex) {
			return url.replace(regex, subs.replace);
		}, url);
	}, url);
}

/**
* Parseia um objeto com várias urls setadas como chave deste objeto.
* Então é retornado um objeto com as rules aplicadas a cada url, que então
* serão usadas para realizar o match de uma URL.
* Os valores de cada objeto são armazenados na propriedade 'data',
* para futura utilização caso necessário.
* @param {Object} urls - Objeto que contém as urls como atributo e quaisquer valores
* @example
* @file startup.js
* @code
* urlParser.buildUrlRules({
    "/app/produtos/cadastrar": ["user"],
    "/app/produtos/*": ["admin"],
    "/app/posts/:id/comments": ["admin"]
})
*/
function buildUrlRules(urls) {
	var urlsIsObject = urls.constructor.name == 'Object';

	return sortByLength(urls).map(function (url) {
		var urlRule = {
			url: url,
			urlRegex: new RegExp(buildUrlRegex(url), 'g')
		};

		if (urlsIsObject) {
			urlRule.data = urls[url];
		}
		
		return urlRule;
	});
}

/**
* Utilizado para realizar o match de uma URL com base em uma URL passada
* e as regras de url, retornadas pelo método 'buildUrlRules'.
* A ultima função é 
* @param {Object} urlRules - Objeto retornado pelo método 'buildUrlRules'
* @param {String} url - URL a ser testada
* @param {Function} acceptMatch - Função que pode ser passada para fazer uma verificação adicional.
* @example
* @file startup.js
* @code
* urlParser.urlMatches(urlRules, '/app/posts/10/comments', function(urlRule) {
	return true;
  });
})
*/
function urlMatches(urlRules, url, acceptMatch) {
	return macthUrl(urlRules, url, acceptMatch) !== undefined;
}

function macthUrl(urlRules, url, acceptMatch) {
	return urlRules.find(function (urlRule) {
		urlRule.urlRegex.lastIndex = 0;

		return urlRule.urlRegex.test(url) && (!acceptMatch || acceptMatch(urlRule));
	});
}

exports = {
	buildUrlRules: buildUrlRules,
	urlMatches: urlMatches
}