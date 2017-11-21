# 00.82.02.00000d_DEV_Center (开发中)

该项目应用于展会的产品展示


## 功能列表
- [x] 产品工程
    - [x] PL工程添加
    - [x] UL工程添加
- [x] APP管理
    - [x] 六轴机器人
    - [x] 模温机
    - [x] 干燥机
    - [x] 牛头机械手
- [x] --


## Start
npm start

## Build
npm run build


## 目录结构

```bash
├── /mock/           # mock的接口文件 
├── /dist/           # 项目构建输出目录
├── /src/            # 项目开发源码目录
│ ├── /components/   # 项目组件
│ │ ├── /common/     # 通用集成组件
│ │ ├── /feature/    # 页面配置文件 （主要配置文件）
│ │ ├── /login/      # 登录组件
│ │ ├── /header/     # 头部组件
│ │ ├── /main/       # 主体组件
│ │ └── /sider/      # 边栏组件
│ │ 
│ ├── /routes/       # 路由组件
│ ├── /utils/        # 工具函数
│ ├── router.jsx     # 路由配置
│ ├── index.jsx      # 入口文件
│ ├── index.less     # 样式主体文件
│ ├── config.js      # 全局配置文件（主要配置文件）
│ └── index.html   
│   
├── package.json     # 项目信息
└── proxy.config.js  # 数据mock配置
```
