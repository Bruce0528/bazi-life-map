const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const window = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'dist/archetypes.js'), 'utf8'), { window });
const ips = window.BaziIps;
assert.equal(ips.profiles.length, 8);
assert.equal(new Set(ips.profiles.map((p) => p.name)).size, 8);
assert.ok(fs.statSync(path.join(root, 'dist/character-sprites.png')).size > 1000000);

const base = { counts: { 木: 4, 火: 3, 土: 2, 金: 1, 水: 0 }, strength: '身偏強', stemIndices: [0, 1, 2, 3] };
for (const [element, id] of Object.entries({ 木: 'wood', 火: 'fire', 土: 'earth', 金: 'metal', 水: 'water' })) {
  const picked = ips.choose({ ...base, dayElement: element, dayStemIndex: 0, dayMaster: `甲${element}` });
  assert.equal(picked.profile.id, id);
  assert.match(picked.why, new RegExp(element));
}
assert.equal(ips.choose({ ...base, dayElement: '水', dayStemIndex: 1, dayMaster: '癸水', stemIndices: [1, 3, 5, 0] }).profile.id, 'yin');
assert.equal(ips.choose({ ...base, dayElement: '火', dayStemIndex: 0, dayMaster: '丙火', stemIndices: [0, 2, 4, 1] }).profile.id, 'yang');
assert.equal(ips.choose({ ...base, counts: { 木: 2, 火: 2, 土: 2, 金: 2, 水: 2 }, strength: '中和', dayElement: '土', dayStemIndex: 1, dayMaster: '己土' }).profile.id, 'harmony');
assert.match(ips.art(ips.profiles[0]), /role="img"/);
const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
assert.match(html, /id="beast-profile"/);
assert.match(html, /src="archetypes.js"/);
console.log('Eight character mappings and assets: OK');
