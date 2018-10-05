# parse-app-info

[![build status](https://img.shields.io/travis/pke/parse-app-info.svg)](https://travis-ci.com/pke/parse-app-info)
[![code coverage](https://img.shields.io/codecov/c/github/pke/parse-app-info.svg)](https://codecov.io/gh/pke/parse-app-info)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/pke/parse-app-info.svg)](LICENSE)

> parse information about an application process


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install parse-app-info
```

[yarn][]:

```sh
yarn add parse-app-info
```


## Usage

```js
const parseAppInfo = require('parse-app-info');

(async () => {
  const appInfo = await parseAppInfo();
  console.log('appInfo', appInfo);
})();
```


## Contributors

| Name                | Website                 |
| ------------------- | ----------------------- |
| **Philipp Kursawe** | <https://pke.github.io> |


## License

[MIT](LICENSE) © [Philipp Kursawe](https://pke.github.io)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
