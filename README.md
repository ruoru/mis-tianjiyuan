# mis-tianjiyuan
TianJiYuan Property co., ltd management information service website.

## Plan
use webpack react redux react-router graphQL HTTP2 Jest in this project.

## Code Directory
```
.
├── build                    # 所有打包配置项
│   └── webpack.config.js    # webpac配置文件
├── config                   # 项目配置文件
│   └── environments.json    # 项目的运行环境配置文件
├── public                   # React挂在页面及样式
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── components           # 全局可复用的表现组件(Presentational Components)
│   ├── containers           # 容器组件
│   ├── layouts              # 主页结构
│   ├── assets               # 静态文件(不要到处imported源文件)
│   └── utils                # 全局通用工具
└── tests                    # 单元测试
```

## Begin Development

### 开发环境
1. 安装 [nvm](//github.com/creationix/nvm) 管理 node 版本（推荐）
2. 使用 nvm 安装 [node] 或直接安装 [node](//nodejs.org)
  * node version: ^8.x(双数版本)
  * npm version: node相对应的版本自带
  * 不要使用yarn和cnpm

### 运行

1. 在控制台切换到本项目目录下运行：

```sh
npm install
```

2. 接下来在根据不同的平台运行以下命令

* mac / linux

```sh
// 默认以 dev 环境启动
npm start
```

* windows

建议 windows 用户安装 [cmder](//cmder.net)，可以运行跟 mac / linux 一样的命令。

在 cmd 控制台

```sh
npm run windows:prod

// 如果上述命令报错，大部分原因是没有 dist 文件夹，运行以下命令后重试。

mkdir dist
```

3. 其他命令说明（以下命令均只能在 mac / linux 上运行）
```sh
`npm start`: 以开发环境环境构建项目，访问开发环境服务，并且在本地启动 nodejs 服务调试。

`npm run build:local`: 以本地环境环境构建项目，访问本地服务。
`npm run local`: 在本地启动 nodejs 服务调试，访问本地服务。

`npm run build:dev`: 以开发环境环境构建项目，访问开发环境服务。
`npm run dev`: 在本地启动 nodejs 服务调试，访问开发环境服务。

`npm run build:prod`: 以生产环境环境构建项目，访问生产环境服务。
`npm run prod`: 在本地启动 nodejs 服务调试，访问生产环境服务。
```
