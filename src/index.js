const readPkgUp = require('read-pkg-up');
const LastCommitLog = require('last-commit-log');
const debug = require('debug')('parse-app-info');

//
// Information about the app.
//
// The git infos can be missing if the project has no commit yet
// or is not connected to a git repo.
//
// * name - The name of the app
// * version - The version of the app
// * node - NodeJS version
// * hash - Last git commit hash
// * tag - Last git tag, if any
// * environment - Nodejs environment the app is run in
// * hostname - Name of the computer the app is run on
// * pid - Process ID of the app
//

// Retrieves informations about the current running app.
function parseAppInfo() {
  const packageInfo = readPkgUp.sync();
  const lastCommitLog = new LastCommitLog();
  let hash;
  let gitTag;
  try {
    ({ hash, gitTag } = lastCommitLog.getLastCommitSync());
  } catch (err) {
    debug(err);
  }

  const lastCommit = { hash };
  if (gitTag) lastCommit.tag = gitTag;

  const { NODE_ENV, HOSTNAME } = process.env;

  return {
    name: packageInfo.pkg.name,
    version: packageInfo.pkg.version,
    node: process.version,
    ...lastCommit,
    environment: NODE_ENV || 'development',
    hostname: HOSTNAME || require('os').hostname(),
    pid: process.pid
  };
}

module.exports = parseAppInfo;
