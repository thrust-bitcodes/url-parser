let majesty = require('majesty')
let urlParser = require('../index.js')

function exec(describe, it, beforeEach, afterEach, expect, should, assert) {
    describe("Testes de parse e math de urls", function () {
        let urlRules;

        it("Deve parsear urls com sucesso", function () {
            urlRules = urlParser.buildUrlRules({
                "/app/produtos/cadastrar": ["user"],
                "/app/produtos/*": ["admin"],
                "/app/posts/:id/comments": ["admin"]
            });
        });

        it("Deve realizar os matches com sucesso", function () {
            [
                {url: '/app/posts', expected: false},
                {url: '/app/produtos/cadastrar', expected: true},
                {url: '/app/produtos/deletar', expected: true},
                {url: '/app/posts/10/comments', expected: true}
            ].forEach(function (testInfo) {
                var actual = urlParser.urlMatches(urlRules, testInfo.url);
                expect(actual).to.equals(testInfo.expected);
            })
        });
    });
}

let res = majesty.run(exec)

print(res.success.length, " scenarios executed with success and")
print(res.failure.length, " scenarios executed with failure.\n")

res.failure.forEach(function (fail) {
    print("[" + fail.scenario + "] =>", fail.execption)
})