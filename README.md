# parse-app-info

[![build status](https://github.com/cabinjs/parse-app-info/actions/workflows/ci.yml/badge.svg)](https://github.com/cabinjs/parse-app-info/actions/workflows/ci.yml)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/cabinjs/parse-app-info.svg)](LICENSE)

> Parse information about a [Node][] application process and its environment. Made for [Cabin][].


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Available info](#available-info)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install parse-app-info
```


## Usage

```js
const parseAppInfo = require('parse-app-info');

const appInfo = parseAppInfo();
```


## Available info

| Property    | Description                                                                              |
| ----------- | ---------------------------------------------------------------------------------------- |
| environment | The value of `process.env.NODE_ENV` or defaults to "development"                         |
| hostname    | Hostame of the computer (uses `process.env.HOSTNAME` or defaults to `os.hostname()`)     |
| ip          | IP address of the computer (uses `process.env.IP_ADDRESS` or defaults to `ip.address()`) |
| name        | Name of the app from `package.json`                                                      |
| node        | Version of Node.js running the app                                                       |
| pid         | Process ID from `process.pid`                                                            |
| version     | Version of the app `package.json`                                                        |
| cluster     | Cluster info of the app                                                                  |
| os          | OS info of the app                                                                       |

Additional properties when the app is in a git repository

| Property | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| hash     | git hash of latest commit if the app                               |
| tag      | the latest git tag. Property is not available when there is no tag |


## Contributors

| Name                | Website                    |
| ------------------- | -------------------------- |
| **Nick Baugh**      | <https://niftylettuce.com> |
| **Philipp Kursawe** | <https://pke.github.io>    |


## License

[MIT](LICENSE) © [Philipp Kursawe](https://pke.github.io)


##

[npm]: https://www.npmjs.com/

[cabin]: https://cabinjs.com

[node]: https://nodejs.org
