const assert = require('assert')
const cheerio = require('cheerio')

const caniuseExtension = require('../src/asciidoctor-caniuse.js')
const asciidoctor = require('asciidoctor.js')()

const registry = caniuseExtension.register(asciidoctor.Extensions.create())

describe('Asciidoctor caniuse extension', function () {
  it('should create a support table', function () {
    const html = asciidoctor.convert('caniuse:battery-status[]', {extension_registry: registry})
    const dom = cheerio.load(html)
    console.log('dom', dom)
    assert.equal(dom('.caniuse').find('.browser').length, 18)
  });

  it('should create a support table using a restricted scope (modern desktop browsers)', function () {
    const html = asciidoctor.convert('caniuse:battery-status[scope="last 1 Chrome versions,last 1 Firefox versions,last 1 Edge versions,last 1 Safari versions,last 1 Opera versions"]', {extension_registry: registry})
    const dom = cheerio.load(html)
    assert.equal(dom('.caniuse').find('.browser').length, 5)
  });
});
