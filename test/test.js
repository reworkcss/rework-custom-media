var assert = require('assert');
var fs = require('fs');
var media = require('..');
var rework = require('rework');

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').trim();
}

function compareFixtures(name, options) {
  var actual = rework(fixture(name), { source: name + '.css' }).use(media(options)).toString().trim();
  var expected = fixture(name + '.out');
  return assert.equal(actual, expected);
}

describe('rework-custom-media', function () {
  it('replaces extension names in media queries', function () {
    compareFixtures('substitution');
  });

  it('replaces all extension names in media queries', function () {
    compareFixtures('multiple-substitutions');
  });

  it('ignores media features that reference an undefined extension name', function () {
    compareFixtures('undefined');
  });

  it('accepts definitions from JavaScript', function () {
    compareFixtures('js-definitions', {
      map: {
        '--medium-window': 'screen and (min-width:600px)',
        '--large-window': 'screen and (min-width:900px)'
      }
    });
  });
});
