# 前端整体架构说明（Vite 版）

本文档详细说明 mmfamily RBAC 前端的整体架构、目录结构、运行机制与配置约定。适用于 Vite 构建环境。

## 一、技术栈与目标
- React 18 + TypeScript：现代组件化与强类型约束
- Ant Design 5：企业级 UI 组件
- react-router-dom v6：路由控制与受保护路由
- axios：HTTP 客户端
- @tanstack/react-query：请求缓存与状态管理
- zustand：轻量状态管理
- Vite 5：快速开发与构建工具，支持 HMR、按需编译、Rollup 打包

目标：在保证工程结构清晰的前提下，提供 RBAC 权限管理的核心页面与交互。

## 二、目录结构
```
src/
  components/       # 通用组件（Header、Sidebar、ProtectedRoute 等）
  pages/            # 业务页面（Dashboard、Login、UserManagement、RoleManagement、PermissionManagement）
  layouts/          # 布局组件（Layout）
  contexts/         # 上下文（AuthContext）
  stores/           # 全局状态（authStore）
  config/           # 配置（api.ts、axiosConfig.ts）
  types/            # 类型定义
  App.tsx           # 顶层应用组件，组织路由与布局
  index.tsx         # 入口 TS 脚本，挂载到 index.html
```

其它关键文件：
- `index.html`：项目根入口页面，Vite 在开发时会注入 HMR 客户端
- `vite.config.ts`：Vite 配置，包含：
  - React 插件（@vitejs/plugin-react-swc）
  - 路径别名：`@` 指向 `src`
  - `server.proxy`：`/api` 转发到后端，避免本地 CORS
- `tsconfig.json`：TypeScript 编译选项与路径别名（`@/* -> src/*`）

## 三、运行机制
- 开发模式：
  - 通过 `npm run dev` 启动 Vite Dev Server（默认 3000）
  - 原生 ES 模块按需编译，HMR 仅更新发生变化的模块，提升热更新速度
  - 通过 `index.html` 加载 `/src/index.tsx`
- 生产构建：
  - `npm run build` 使用 Rollup 打包
  - 自动代码拆分与资源指纹（hash）
  - 构建产物输出至 `dist/`
  - `npm run preview` 启动本地静态预览

## 四、环境变量与配置约定
- Vite 客户端环境变量须使用 `VITE_` 前缀，例如：`VITE_API_URL`
- 代码中通过 `import.meta.env.VITE_API_URL` 访问
- API 基地址：
  - 默认：`/api`（走 Vite 代理）
  - 可在 `.env` 设置 `VITE_API_URL=http://localhost:8080/api` 或生产地址
- 示例：`src/config/api.ts`
  ```ts
  export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
  ```

## 五、HTTP 客户端与拦截器
- `src/config/axiosConfig.ts` 创建 axios 实例：
  - `baseURL`: `API_BASE_URL`
  - `timeout`: 10000ms
  - 请求拦截器：自动附加 Authorization Token（从 localStorage 读取）
  - 响应拦截器：401 时清理本地状态并跳转到 `/login`

## 六、认证与权限
- `contexts/AuthContext.tsx`：提供当前用户与登录状态的上下文
- `components/ProtectedRoute.tsx`：受保护路由，未登录跳转至 Login
- 页面级权限控制可在各页面中结合当前用户的角色与权限进行处理

## 七、路由与布局
- `App.tsx`：定义路由结构与整体布局（Header、Sidebar、主内容区）
- 未匹配路由：`pages/NotFound.tsx`

## 八、状态管理
- `stores/authStore.ts`：管理认证相关的全局状态（例如 token、当前用户）
- 结合 React Query 管理请求缓存与加载状态，减少手动数据管理

## 九、常见问题与优化
- 首包较大：对页面或模块使用动态 import()，开启代码分包
- API 跨域：本地开发使用 `server.proxy`，生产通过网关/Nginx 处理跨域
- 环境变量未生效：修改 `.env` 后需重启 dev server
- `process is not defined`：在 Vite 中使用 `import.meta.env` 替代 `process.env`
- 端口占用：Vite 会自动换端口；也可指定 `npm run dev -- --port 3002`

## 十、部署建议
- 生产构建：`npm ci && npm run build`
- 静态资源托管：将 `dist/` 部署至静态服务器或 CDN
- 后端网关：为 `/api` 提供反向代理与跨域配置；前端通过 `.env` 指向生产 API 地址

## 十一、研发规范建议
- 代码风格：ESLint + Prettier（可按需引入）
- 单元测试：Vitest + Testing Library（可按需引入）
- CI/CD：编写简单的构建与检查流程（安装依赖、类型检查、单元测试、构建）

