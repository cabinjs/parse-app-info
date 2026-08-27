const process = require('node:process');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const test = require('ava');

function getIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const addresses of Object.values(interfaces)) {
    for (const address of addresses || []) {
      const family =
        address.family === 4 || address.family === 'IPv4' ? 'IPv4' : 'IPv6';
      if (family === 'IPv4' && !address.internal) return address.address;
    }
  }

  return '127.0.0.1';
}

let hash;
try {
  hash = execFileSync('git', ['log', '-1', '--pretty=format:%H'], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'ignore']
  })
    .toString()
    .trim();
} catch {}

test.beforeEach((t) => {
  t.context.parseAppInfo = require('..');
});

test('returns info', (t) => {
  const appInfo = t.context.parseAppInfo();
  t.is(appInfo.node, process.version);
  t.is(appInfo.environment, 'test');
  t.is(appInfo.hostname, os.hostname());
  t.is(appInfo.pid, process.pid);
  t.is(appInfo.name, 'parse-app-info');
  t.is(appInfo.hash, hash);
  t.is(appInfo.ip, getIpAddress());
});
