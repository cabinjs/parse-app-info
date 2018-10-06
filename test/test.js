const test = require('ava');
const td = require('testdouble');

test.beforeEach(t => {
  t.context.LastCommitLog = td.replace('last-commit-log');
  t.context.parseAppInfo = require('..');
});

test.afterEach(() => {
  td.reset();
});

test('does not include missing git info', async t => {
  td.when(t.context.LastCommitLog.prototype.getLastCommit()).thenReject();
  const appInfo = await t.context.parseAppInfo();
  t.is(appInfo.hash, undefined);
  t.is(appInfo.tag, undefined);
});

test('does not include missing git tag', async t => {
  td.when(t.context.LastCommitLog.prototype.getLastCommit()).thenResolve({
    hash: 0xdeadbeadd00de
  });
  const appInfo = await t.context.parseAppInfo();
  t.is(appInfo.hash, 0xdeadbeadd00de);
  t.is(appInfo.tag, undefined);
});

test('returns this packages info', async t => {
  td.when(t.context.LastCommitLog.prototype.getLastCommit()).thenResolve({
    hash: 0xdeadbeadd00de,
    gitTag: '1.0.2'
  });
  const appInfo = await t.context.parseAppInfo();
  t.is(appInfo.node, process.version);
  t.is(appInfo.environment, 'test');
  t.is(appInfo.hostname, require('os').hostname());
  t.is(appInfo.pid, process.pid);
  t.is(appInfo.name, 'parse-app-info');
  t.is(appInfo.hash, 0xdeadbeadd00de);
  t.is(appInfo.tag, '1.0.2');
});
