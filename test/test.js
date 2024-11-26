const process = require('node:process');
const test = require('ava');
const LastCommitLog = require('last-commit-log');

const lastCommitLog = new LastCommitLog();
let hash;
try {
  ({ hash } = lastCommitLog.getLastCommitSync());
} catch {}

test.beforeEach((t) => {
  t.context.parseAppInfo = require('..');
});

test('returns info', (t) => {
  const appInfo = t.context.parseAppInfo();
  t.is(appInfo.node, process.version);
  t.is(appInfo.environment, 'test');
  t.is(appInfo.hostname, require('node:os').hostname());
  t.is(appInfo.pid, process.pid);
  t.is(appInfo.name, 'parse-app-info');
  t.is(appInfo.hash, hash);
  t.is(appInfo.ip, require('ip').address());
});
