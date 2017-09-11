# 禾苗数据化可视化平台

> hemiao data visualization platform

## Nodejs 需要至少6.10以上版本.

## 开发环境构建: Development Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev # Or yarn run dev

# build for production and launch server
$ npm start # Or yarn start
```

## 生产环境构建: Production Build Setup

``` bash
# setup git repos and build css and js files.
$ pm2 deploy ecosystem.config.js production setup

# run server using pm2.
$ pm2 deploy ecosystem.config.js production --force
```