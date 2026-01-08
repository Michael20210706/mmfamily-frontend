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

目录结构（关键文件）
- `src/` 业务代码（组件、页面、布局、配置、上下文、stores、types）
- `vite.config.ts` Vite 配置（别名、代理、端口等）
- `tsconfig.json` TypeScript 配置（路径别名、jsx 等）
- `README.md` 项目说明（当前文档）
- `docs/` 详细文档归档（架构说明、部署、概览、权限模型、迁移说明）

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
