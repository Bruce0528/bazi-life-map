const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { Solar } = require('../dist/lunar.js');

const elements = new Map();
const value = (id, text) => { elements.set('#' + id, { value: text, addEventListener() {} }); };
value('male-name', '甲'); value('male-date', '1993-05-28'); value('male-time', '14:15');
value('female-name', '乙'); value('female-date', '1993-05-29'); value('female-time', '14:15');
for (const prefix of ['male', 'female']) for (const key of ['money', 'values', 'love']) value(prefix + '-' + key, '');
for (const id of ['compatibility-form', 'compatibility-result', 'compatibility-summary', 'compatibility-cards', 'report']) {
  elements.set('#' + id, { hidden: true, innerHTML: '', addEventListener() {}, scrollIntoView() {} });
}
elements.set('.top-links a[href="#compatibility"]', { addEventListener() {} });
const document = {
  querySelector(selector) { return elements.get(selector) || { addEventListener() {} }; },
  querySelectorAll() { return []; },
};
const context = vm.createContext({ Solar, document, window: { scrollTo() {} }, console, setTimeout, Date });
for (const file of ['app.js', 'compatibility.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../dist', file), 'utf8'), context);
const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
const choices = vm.runInContext('compatibilityChoices', context);
for (const side of ['male', 'female']) for (const [category, labels] of Object.entries(choices)) {
  const select = html.match(new RegExp('<select id="' + side + '-' + category + '">([\\s\\S]*?)</select>'));
  assert.ok(select, `Missing ${side}-${category}`);
  for (const [key, label] of Object.entries(labels)) assert.ok(select[1].includes(`<option value="${key}">${label}</option>`), `${side}-${category}: ${label}`);
}

const first = vm.runInContext('generateCompatibility()', context);
assert.ok(first.score >= 0 && first.score <= 100);
assert.equal(first.scoreParts.reduce((n, part) => n + part.value, 0), first.score);
assert.match(elements.get('#compatibility-summary').innerHTML, /命盤互動參考分/);
assert.match(elements.get('#compatibility-cards').innerHTML, /性格互動/);
assert.match(elements.get('#compatibility-cards').innerHTML, /相處模式/);

value('male-money', 'independent'); value('female-money', 'budget');
value('male-values', 'travel'); value('female-values', 'balance');
value('male-love', 'time'); value('female-love', 'commit');
const withPreferences = vm.runInContext('generateCompatibility()', context);
assert.equal(withPreferences.score, first.score, 'Self-reported preferences must not change the chart score');
const cards = elements.get('#compatibility-cards').innerHTML;
for (const expected of ['各自保有財務自主', '共同記帳與預算規劃', '旅行探索與新體驗', '健康平衡與慢生活', '固定相處與專心陪伴', '穩定承諾與未來規劃']) assert.ok(cards.includes(expected));

value('female-date', '1988-12-02');
const second = vm.runInContext('generateCompatibility()', context);
assert.notDeepEqual(first.femalePillars, second.femalePillars);
assert.notEqual(first.score, second.score);
assert.equal(elements.get('#compatibility-result').hidden, false);
console.log('Compatibility scoring and rendering: OK', first.score, second.score);
