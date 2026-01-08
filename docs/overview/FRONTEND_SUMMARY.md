# 前端概览（Summary）

本文件提供一个面向使用者与维护者的快速概览，包含项目的目的、技术栈、运行方式与关键入口。

## 目的
- 提供 RBAC 权限管理的前端界面：用户、角色、权限的增删改查与分配。

## 技术栈
- React 18 + TypeScript
- Ant Design 5
- react-router-dom v6
- axios + React Query
- zustand
- Vite 5（构建与开发服务器）

## 关键入口
- 项目根 `index.html`：浏览器入口页面
- `src/index.tsx`：React 应用入口
- `vite.config.ts`：Vite 配置（端口、代理、别名、插件）

## 运行方式
```zsh
npm install
npm run dev
```
- 默认端口 3000（占用则自动换端口）
- 浏览器访问终端提示的 Local URL

## 环境与代理
- 环境变量通过 `import.meta.env.VITE_*` 访问
- 默认 API 基地址为 `/api`，由 Vite 转发至后端（`server.proxy`）

## 构建与预览
```zsh
npm run build
npm run preview
```
- 构建产物位于 `dist/`

## 后续参考
- 深入架构：`docs/architecture/FRONTEND_ARCHITECTURE.md`
- 迁移说明：`docs/setup/VITE_MIGRATION.md`

