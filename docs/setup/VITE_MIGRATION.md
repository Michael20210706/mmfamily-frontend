# CRA 到 Vite 迁移说明与清理指南

本文帮助你理解从 Create React App (CRA) 迁移到 Vite 的关键步骤与清理项。

## 一、迁移动机
- 更快的开发启动与热更新（HMR）
- 更简洁的配置、原生 ES 模块支持
- 生产构建使用 Rollup，具备更灵活的分包策略

## 二、核心改动
1. 依赖与脚本
   - 移除 `react-scripts`
   - 新增 `vite` 与 `@vitejs/plugin-react-swc`
   - 将 scripts 替换为：`dev`、`build`、`preview`

2. 入口页面
   - CRA：`public/index.html`
   - Vite：项目根 `index.html`，通过 `<script type="module" src="/src/index.tsx">` 加载入口

3. 环境变量
   - CRA：`process.env.REACT_APP_*`
   - Vite：`import.meta.env.VITE_*`
   - 在代码中替换所有 `process.env.REACT_APP_*` 为 `import.meta.env.VITE_*`

4. 代理与跨域
   - CRA 使用 webpack devServer 的选项
   - Vite 使用 `server.proxy`：例如将 `/api` 代理到后端 `http://localhost:8080`

5. 路径别名
   - 在 `vite.config.ts` 中设置 `resolve.alias`，并在 `tsconfig.json` 中同步 `paths`

## 三、清理建议
- 删除不再使用的文件：
  - `public/index.html`（前端入口已在根 `index.html`）
  - `public/manifest.json`（如不需要 PWA，可移除）
- 删除 CRA 特有配置：
  - `eslintConfig` 中的 `react-app` 扩展（可改为自定义 ESLint 设置）
  - `browserslist` 可按需保留或迁移到单独配置文件
- 全局搜索并替换：
  - `process.env.REACT_APP_*` -> `import.meta.env.VITE_*`

## 四、验证与测试
- 本地启动：`npm run dev`（如端口占用，Vite 自动换端口，也可 `--port` 指定）
- 构建：`npm run build`，产物在 `dist/`
- 预览：`npm run preview`

## 五、常见问题
- `process is not defined`
  - 说明代码仍在引用 `process.env`，请改用 `import.meta.env`
- 端口冲突
  - 关闭占用端口的进程，或使用 `npm run dev -- --port 3002`
- CORS 问题
  - 本地通过 `server.proxy` 解决，生产通过网关/Nginx 配置跨域

## 六、后续优化（可选）
- 引入 ESLint + Prettier，统一代码风格
- 使用 Vitest + Testing Library 搭建测试
- 使用动态 import 与 `manualChunks` 优化代码拆分

