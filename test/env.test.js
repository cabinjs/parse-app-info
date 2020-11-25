const test = require('ava');
const mockedEnv = require('mocked-env');

const parseAppInfo = require('..');

test.afterEach((t) => {
  t.context.restoreEnv();
});

function run(t, input = [], expected = input) {
  t.context.restoreEnv = mockedEnv({
    NODE_ENV: input[0],
    HOSTNAME: input[1]
  });
  const appInfo = parseAppInfo();
  t.is(appInfo.environment, expected[0]);
  t.is(appInfo.hostname, expected[1]);
}

test.serial('custom env vars', run, ['got', 'walder_frey']);
test('undefined env vars', run, undefined, [
  'development',
  require('os').hostname()
]);
