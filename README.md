# mis-tianjiyuan
TianJiYuan Property co., ltd management information service website.

## Begin development

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
npm start
```

* windows

建议 windows 用户安装 [cmder](//cmder.net/) 可以运行跟 mac / linux 一样的命令。

在 cmd 控制台

```sh
npm run windows:prod

// 如果上述命令报错，大部分原因是没有 dist 文件夹，运行以下命令后重试。

mkdir dist
```

命令说明（以下命令均只能在 mac / linux 上运行）
```sh
`npm start`: 以生产环境环境构建项目，访问生产环境服务，并且在本地启动 nodejs 服务调试。

`npm run build:local`: 以本地环境环境构建项目，访问本地服务。
`npm run local`: 在本地启动 nodejs 服务调试，访问本地服务。

`npm run build:dev`: 以开发环境环境构建项目，访问开发环境服务。
`npm run dev`: 在本地启动 nodejs 服务调试，访问开发环境服务。

`npm run build:prod`: 以生产环境环境构建项目，访问生产环境服务。
`npm run prod`: 在本地启动 nodejs 服务调试，访问生产环境服务。
```

## 项目结构

参考
[react-starter-kit](https://github.com/bodyno/react-starter-kit.git)

```
.
├── bin                      # 启动脚本
├── blueprints               # redux-cli的蓝图
├── build                    # 所有打包配置项
│   └── webpack              # webpack的指定环境配置文件
├── config                   # 项目配置文件
├── server                   # Express 程序 (使用 webpack 中间件)
│   └── main.js              # 服务端程序入口文件
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── components           # 全局可复用的表现组件(Presentational Components)
│   ├── containers           # 全局可复用的容器组件
│   ├── layouts              # 主页结构
│   ├── static               # 静态文件(不要到处imported源文件)
│   ├── styles               # 程序样式
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── reducers.js      # Reducer注册和注入
│   └── routes               # 主路由和异步分割点
│       ├── index.js         # 用store启动主程序路由
│       ├── Root.js          # 为上下文providers包住组件
│       └── Home             # 不规则路由
│           ├── index.js     # 路由定义和代码异步分割
│           ├── assets       # 组件引入的静态资源
│           ├── components   # 直观React组件
│           ├── container    # 连接actions和store
│           ├── modules      # reducers/constants/actions的集合
│           └── routes **    # 不规则子路由(** 可选择的)
├── tests                    # 单元测试
├── .babelrc                 # Babel 转码配置
├── .eslintignore            # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc                # ESLint 配置
├── .gitignore               # （配置）需被 Git 忽略的文件（夹）
└── package.json             # （这个就不用多解释了吧）
```