const test = require('ava');

const parseAppInfo = require('..');

test('returns this packages info', async t => {
  const appInfo = await parseAppInfo();
  t.is(appInfo.node, process.version);
  t.is(appInfo.environment, 'test');
  t.is(appInfo.hostname, require('os').hostname());
  t.is(appInfo.pid, process.pid);
  t.is(appInfo.name, 'parse-app-info');
});
