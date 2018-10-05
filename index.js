const readPkgUp = require('read-pkg-up');
const LastCommitLog = require('last-commit-log');

/**
 * Information about the app
 * @typedef {Object} AppInfo
 * @property {string} name The name of the app
 * @property {string} version The version of the app
 * @property {string} node NodeJS version
 * @property {string} hash Last git commit hash
 * @property {string} tag Last git tag, if any
 * @property {string} environment Nodejs environment the app is run in
 * @property {string} hostname Name of the computer the app is run on
 * @property {number} pid Process ID of the app
 */

/**
 * Retrieves informations about the current running app.
 *
 * @async
 * @return {Promise<AppInfo>} A promise that resolves the app info
 */
async function parseAppInfo() {
  const lastCommitLog = new LastCommitLog();

  const [packageInfo, lastCommit] = await Promise.all([
    readPkgUp(),
    lastCommitLog.getLastCommit()
  ]);

  const { NODE_ENV, HOSTNAME } = process.env;

  return {
    name: packageInfo.pkg.name,
    version: packageInfo.pkg.version,
    node: process.version,
    hash: lastCommit.hash,
    tag: lastCommit.gitTag,
    environment: /* istanbul ignore next */ NODE_ENV || 'development',
    hostname: /* istanbul ignore next */ HOSTNAME || require('os').hostname(),
    pid: process.pid
  };
}

module.exports = parseAppInfo;
