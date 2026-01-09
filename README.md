# MMFamily RBAC 前端

一个基于 React 18 + TypeScript + Ant Design + Vite 的权限管理前端项目，提供用户、角色、权限的管理功能，并通过 axios 与后端交互，结合 React Query 管理数据请求状态。

## 运行与构建

```zsh
npm install
npm run dev      # 启动本地开发服务器（默认 3000，占用会换端口）
npm run build    # 生产构建，输出到 dist/
npm run preview  # 本地预览 dist 构建
```

## 技术栈与结构
- 框架：React 18 + TypeScript
- UI：Ant Design 5
- 路由：react-router-dom v6
- 数据：axios + @tanstack/react-query
- 状态管理：zustand
- 构建：Vite 5 + @vitejs/plugin-react-swc
- 入口：项目根 `index.html` + `src/index.tsx`

## 工程整体结构

```
mmfamily-frontend/
├── docs/                           # 📚 项目文档
│   ├── README.md                   # 文档索引
│   ├── architecture/               # 架构文档
│   │   ├── ARCHITECTURE.md         # 系统架构说明
│   │   └── FRONTEND_ARCHITECTURE.md # 前端架构详解
│   ├── deployment/                 # 部署文档
│   │   └── DEPLOYMENT.md           # 部署指南
│   ├── overview/                   # 概览文档
│   │   ├── PROJECT_SUMMARY.md      # 项目概述
│   │   └── FRONTEND_SUMMARY.md     # 前端概览
│   ├── security/                   # 安全文档
│   │   └── PERMISSION_MODEL.md     # 权限模型说明
│   └── setup/                      # 搭建文档
│       ├── QUICK_START.md          # 快速开始
│       ├── BACKEND_SETUP.md        # 后端搭建指南
│       └── VITE_MIGRATION.md       # Vite 迁移说明
│
├── src/                            # 💻 源代码
│   ├── components/                 # 通用组件
│   │   ├── Header.tsx              # 页面头部（用户菜单、退出）
│   │   ├── Header.css
│   │   ├── Sidebar.tsx             # 侧边导航菜单
│   │   ├── Sidebar.css
│   │   └── ProtectedRoute.tsx      # 路由保护组件
│   ├── pages/                      # 业务页面
│   │   ├── Login.tsx               # 登录页面
│   │   ├── Login.css
│   │   ├── Dashboard.tsx           # 仪表板（数据统计）
│   │   ├── Dashboard.css
│   │   ├── UserManagement.tsx      # 用户管理（CRUD + 角色分配）
│   │   ├── RoleManagement.tsx      # 角色管理（CRUD + 权限分配）
│   │   ├── PermissionManagement.tsx # 权限管理（CRUD）
│   │   ├── Management.css          # 管理页面通用样式
│   │   └── NotFound.tsx            # 404 页面
│   ├── layouts/                    # 布局组件
│   │   ├── Layout.tsx              # 主布局（Header + Sidebar + Content）
│   │   └── Layout.css
│   ├── contexts/                   # React Context
│   │   └── AuthContext.tsx         # 认证上下文（用户信息、登录状态）
│   ├── stores/                     # 状态管理
│   │   └── authStore.ts            # Zustand 认证状态
│   ├── config/                     # 配置文件
│   │   ├── api.ts                  # API 端点定义（用户、角色、权限）
│   │   └── axiosConfig.ts          # Axios 实例配置（拦截器、认证）
│   ├── types/                      # TypeScript 类型
│   │   └── index.ts                # 全局类型定义（User、Role、Permission）
│   ├── App.tsx                     # 主应用组件（路由配置）
│   ├── App.css                     # 应用样式
│   ├── index.tsx                   # React 入口脚本
│   └── index.css                   # 全局样式
│
├── public/                         # 静态资源（已清理 CRA 遗留文件）
├── dist/                           # 构建产物（生成）
├── node_modules/                   # 依赖包（安装后生成）
│
├── index.html                      # 📄 HTML 入口（Vite）
├── vite.config.ts                  # ⚙️ Vite 配置（别名、代理、端口）
├── tsconfig.json                   # ⚙️ TypeScript 配置（路径别名、编译选项）
├── tsconfig.node.json              # ⚙️ TypeScript Node 配置
├── package.json                    # 📦 项目配置与依赖
├── .env                            # 🔐 环境变量（VITE_API_URL）
├── .gitignore                      # Git 忽略配置
└── README.md                       # 📖 项目说明（本文档）
```

### 核心目录说明

**src/components/** - 可复用的 UI 组件
- Header：顶部导航栏，显示当前用户、退出按钮
- Sidebar：侧边导航菜单，根据路由高亮
- ProtectedRoute：受保护路由，未登录自动跳转登录页

**src/pages/** - 业务页面组件
- Login：用户登录，JWT 认证
- Dashboard：首页仪表板，展示系统统计数据
- UserManagement：用户增删改查、角色分配
- RoleManagement：角色增删改查、权限树形分配
- PermissionManagement：权限增删改查

**src/config/** - 配置与 HTTP 客户端
- api.ts：所有后端 API 端点的集中定义
- axiosConfig.ts：axios 实例，自动附加 JWT token，处理 401 跳转

**src/contexts/** 与 **src/stores/** - 状态管理
- AuthContext：React Context 提供认证状态
- authStore：Zustand 全局状态（token、用户信息）

**docs/** - 详细文档归档
- 架构说明、部署指南、权限模型、迁移说明等

## 环境变量
- 使用 Vite 约定：`import.meta.env.VITE_*`
- 示例：`.env` 中可配置 `VITE_API_URL=http://localhost:8080/api`
- 默认：未设置时，前端将使用相对基路径 `/api`，并通过 Vite 的 `server.proxy` 转发到后端

## 本地代理
- `vite.config.ts` 中配置了：
  - `server.proxy['/api'] -> http://localhost:8080`
- 好处：避免 CORS，统一使用相对路径 `/api`
- 生产环境通常不使用前端代理，可在 `.env` 中设置 `VITE_API_URL` 指向后端真实地址

## CRA -> Vite 迁移与清理
- 已将脚本从 `react-scripts` 切换为 Vite 脚本
- 环境变量从 `process.env.REACT_APP_*` 改为 `import.meta.env.VITE_*`
- 入口页面改为项目根 `index.html`
- 代码清理建议（可选）：
  - 删除未使用的 `public/index.html`、`public/manifest.json`
  - 删除任何依赖 `react-scripts` 的配置/脚本
  - 搜索并替换剩余的 `process.env.REACT_APP_*` 引用

更多细节与架构说明请参见 `docs/architecture/FRONTEND_ARCHITECTURE.md` 与 `docs/setup/VITE_MIGRATION.md`。
