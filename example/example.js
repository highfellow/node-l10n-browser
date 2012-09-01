/**
 *  Test code for node-l10n.
 **/

var L10n = require('l10n');
var L10n_Browser = require('../l10n-browser.js');

// run through plurals using a given adjective.
function repeat(adjKey) {
  adj=l10n.get(adjKey,{},'colour');
  for (var n = 0; n < 4; n++) {
    console.log("  ",l10n.get('phrase',{'n':n, 'adj':adj}, 'brown fox phrase'));
  }
}

// test in a given language.
function testLanguage(lang, callback) {
  console.log();
  console.log('Testing in language:', lang);
  console.log('=======================');
  console.log();
  l10n.loadResource('data.properties', lang, function() {
    console.log('Standard version:');
    repeat('brown');
    console.log();
    console.log('Testing parameter substitution:');
    repeat('pink');
    callback && callback();
  },
  function(err) {
    console.log('Failed to load data.properties');
  });
}

// initialise L10n with the file adapter.
var l10n = new L10n(new L10n_Browser());

// do the tests.
testLanguage('en', function() {
  testLanguage('de');
});
