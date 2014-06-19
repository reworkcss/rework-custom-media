var assert = require('assert');
var fs = require('fs');
var media = require('..');
var rework = require('rework');

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').trim();
}

function compareFixtures(name) {
  var actual = rework(fixture(name)).use(media).toString().trim();
  var expected = fixture(name + '.out');
  return assert.equal(actual, expected);
}

describe('rework-custom-media', function () {
  it('replaces extension names in media queries', function () {
    compareFixtures('substitution');
  });

  it('ignores media features that reference an undefined extension name', function () {
    compareFixtures('undefined');
  });
});
