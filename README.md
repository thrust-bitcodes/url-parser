url-parser
===============

url-parser é um *bitcode* de parse e matches de url.

# Instalação

Posicionado em um app [thrust](https://github.com/thrustjs/thrust), no seu terminal:

```bash
thrust install url-parser
```

## Tutorial

Primeiro vamos configurar nosso arquivo de inicialização *startup.js*, nele devemos fazer *require* do *url-parser*

```javascript
//Realizamos o require do bitcode
let urlParser = require('url-parser')

let urlRules = urlParser.buildUrlRules({
    "/app/produtos/cadastrar": ["user"],
    "/app/produtos/*": ["admin"],
    "/app/posts/:id/comments": ["admin"]
});

console.log(urlParser.urlMatches(urlRules, '/app/posts/10/comments'))
```

## API

```javascript
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
buildUrlRules(urls)

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
urlMatches(urlRules, url, acceptMatch)
```