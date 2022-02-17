const process = require('process');

const test = require('ava');
const td = require('testdouble');

test.beforeEach((t) => {
  t.context.LastCommitLog = td.replace('last-commit-log');
  t.context.parseAppInfo = require('..');
});

test.afterEach(() => {
  td.reset();
});

test('does not include missing git info', (t) => {
  td.when(t.context.LastCommitLog.prototype.getLastCommitSync()).thenReturn({});
  const appInfo = t.context.parseAppInfo();
  t.is(appInfo.hash, undefined);
  t.is(appInfo.tag, undefined);
});

test('does not include missing git tag', (t) => {
  td.when(t.context.LastCommitLog.prototype.getLastCommitSync()).thenReturn({
    hash: 0xd_ea_db_ea_dd_00_de
  });
  const appInfo = t.context.parseAppInfo();
  t.is(appInfo.hash, 0xd_ea_db_ea_dd_00_de);
  t.is(appInfo.tag, undefined);
});

test('returns this packages info', (t) => {
  td.when(t.context.LastCommitLog.prototype.getLastCommitSync()).thenReturn({
    hash: 0xd_ea_db_ea_dd_00_de,
    gitTag: '1.0.2'
  });
  const appInfo = t.context.parseAppInfo();
  t.is(appInfo.node, process.version);
  t.is(appInfo.environment, 'test');
  t.is(appInfo.hostname, require('os').hostname());
  t.is(appInfo.pid, process.pid);
  t.is(appInfo.name, 'parse-app-info');
  t.is(appInfo.hash, 0xd_ea_db_ea_dd_00_de);
  t.is(appInfo.tag, '1.0.2');
});
