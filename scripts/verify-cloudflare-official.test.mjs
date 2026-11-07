import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const a=JSON.parse(readFileSync(new URL('../cloudflare/wrangler.jsonc',import.meta.url),'utf8'));
const b=JSON.parse(readFileSync(new URL('../cloudflare/wrangler.production.jsonc',import.meta.url),'utf8'));
test('official domain is limited to the existing canonical Worker',()=>{
  assert.equal(a.name,b.name);
  assert.equal(a.main,b.main);
  assert.equal(a.account_id,b.account_id);
  assert.deepEqual(a.assets,b.assets);
  assert.equal(a.routes,undefined);
  assert.deepEqual(b.routes,[{pattern:'giovanni.sejasagaz.com',custom_domain:true}]);
});
