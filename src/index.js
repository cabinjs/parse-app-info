const cluster = require('cluster');
const os = require('os');

const LastCommitLog = require('last-commit-log');
const _ = require('lodash');
const debug = require('debug')('parse-app-info');
const readPkgUp = require('read-pkg-up');
const semver = require('semver');

const hasWorkerThreads = semver.satisfies(process.version, '>=10.5.0');
let worker_threads;
if (hasWorkerThreads) worker_threads = require('worker_threads');

const OS_METHODS = [
  'arch',
  'cpus',
  'endianness',
  'freemem',
  'getPriority', // => priority
  'homedir',
  'hostname',
  'loadavg',
  'networkInterfaces', // => network_interfaces
  'platform',
  'release',
  'tmpdir',
  'totalmem',
  'type',
  'uptime',
  'userInfo' // => user
];

// `os.version` added in 13.11.0
// https://nodejs.org/api/os.html#os_os_version
if (semver.satisfies(process.version, '>=13.11.0')) {
  OS_METHODS.push('version');
}

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
// * cluster - Cluster info of the app
// * os - OS info of the app
//

// Retrieves informations about the current running app.
// eslint-disable-next-line complexity
function parseAppInfo() {
  const packageInfo = readPkgUp.sync();
  const info = {};
  if (
    typeof packageInfo === 'object' &&
    typeof packageInfo.packageJson === 'object'
  ) {
    if (typeof packageInfo.packageJson.name === 'string')
      info.name = packageInfo.packageJson.name;
    if (typeof packageInfo.packageJson.version === 'string')
      info.version = packageInfo.packageJson.version;
  }

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

  const _cluster = _.pick(cluster, [
    'worker',
    'isMaster',
    'isWorker',
    'schedulingPolicy'
  ]);
  if (_.isObject(_cluster.worker)) {
    _cluster.worker = _.pick(_cluster.worker, [
      'id',
      'process',
      'exitedAfterDisconnect',
      'isConnected',
      'isDead'
    ]);

    if (_.isObject(_cluster.worker.process)) {
      _cluster.worker.process = _.pick(_cluster.worker.process, [
        'pid',
        'connected',
        'killed',
        'signalCode',
        'exitCode'
      ]);
    }

    if (_.isFunction(_cluster.worker.isConnected))
      _cluster.worker.isConnected = _cluster.worker.isConnected();
    if (_.isFunction(_cluster.worker.isDead))
      _cluster.worker.isDead = _cluster.worker.isDead();
  }

  const _os = {};
  for (const method of OS_METHODS) {
    let key = method;
    if (method === 'getPriority') key = 'priority';
    else if (method === 'networkInterfaces') key = 'network_interfaces';
    else if (method === 'userInfo') key = 'user';
    _os[key] = os[method]();
  }

  // worker_threads
  let _worker_threads = {};
  if (hasWorkerThreads) {
    _worker_threads = _.pick(worker_threads, [
      'isMainThread',
      semver.satisfies(process.version, '>=12.16.0') && 'resourceLimits',
      'threadId',
      'workerData'
    ]);

    if (_.isObject(_worker_threads.resourceLimits)) {
      _worker_threads.resourceLimits = _.pick(_worker_threads.resourceLimits, [
        'maxYoungGenerationSizeMb',
        'maxOldGenerationSizeMb',
        'codeRangeSizeMb',
        'stackSizeMb'
      ]);
    }
  }

  return {
    ...info,
    node: process.version,
    ...lastCommit,
    environment: NODE_ENV || 'development',
    hostname: HOSTNAME || os.hostname(),
    pid: process.pid,
    cluster: _cluster,
    os: _os,
    worker_threads: _worker_threads
  };
}

module.exports = parseAppInfo;
