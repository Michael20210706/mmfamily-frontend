# RBAC权限管理系统前端

> 完整文档索引请见：[docs/README.md](./docs/README.md)

一个基于React + TypeScript的企业级RBAC（角色基权限）权限管理系统前端。

## 功能特性

✨ **完整的RBAC实现**
- 👥 用户管理：创建、编辑、删除用户，分配角色
- 👨‍💼 角色管理：创建、编辑、删除角色，分配权限
- 🔐 权限管理：创建、编辑、删除权限，精细化权限控制
- 📊 仪表板：系统概览和统计数据展示

## 技术栈

- **前端框架**: React 18.2.0
- **语言**: TypeScript 5.3.3
- **路由**: React Router 6.20.1
- **UI组件**: Ant Design 5.11.5
- **状态管理**: Zustand 4.4.7
- **HTTP客户端**: Axios 1.6.2
- **数据获取**: TanStack Query 5.28.0

## 项目结构

```
src/
├── components/           # 通用组件
│   ├── Header.tsx       # 页面头部
│   ├── Sidebar.tsx      # 侧边栏导航
│   └── ProtectedRoute.tsx # 路由保护
├── config/              # 配置文件
│   ├── api.ts          # API端点定义
│   └── axiosConfig.ts  # Axios实例配置
├── contexts/            # React Context
│   └── AuthContext.tsx  # 认证上下文
├── layouts/             # 布局组件
│   └── Layout.tsx      # 主布局
├── pages/               # 页面组件
│   ├── Login.tsx       # 登录页面
│   ├── Dashboard.tsx   # 仪表板
│   ├── UserManagement.tsx    # 用户管理
│   ├── RoleManagement.tsx    # 角色管理
│   └── PermissionManagement.tsx # 权限管理
├── stores/              # Zustand存储
│   └── authStore.ts    # 认证存储
├── types/               # TypeScript类型定义
│   └── index.ts        # 所有类型定义
├── App.tsx             # 主应用组件
└── index.tsx           # 应用入口
```

## 安装和运行

### 前置条件
- Node.js >= 14.0
- npm >= 6.0 或 yarn >= 1.22

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm start
# 或
yarn start
```

应用将在 `http://localhost:3000` 打开。

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

## API对接

### 后端要求

该前端应用需要与Spring Cloud后端服务配合使用。后端服务需要提供以下API接口：

#### 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/current` - 获取当前用户信息

#### 用户管理接口
- `GET /api/users` - 获取用户列表（支持分页）
- `GET /api/users/{id}` - 获取用户详情
- `POST /api/users` - 创建用户
- `PUT /api/users/{id}` - 更新用户
- `DELETE /api/users/{id}` - 删除用户
- `POST /api/users/assign-role` - 分配角色
- `POST /api/users/remove-role` - 移除角色

#### 角色管理接口
- `GET /api/roles` - 获取角色列表（支持分页）
- `GET /api/roles/{id}` - 获取角色详情
- `POST /api/roles` - 创建角色
- `PUT /api/roles/{id}` - 更新角色
- `DELETE /api/roles/{id}` - 删除角色
- `GET /api/roles/{roleId}/permissions` - 获取角色的权限
- `POST /api/roles/assign-permission` - 分配权限
- `POST /api/roles/remove-permission` - 移除权限

#### 权限管理接口
- `GET /api/permissions` - 获取权限列表（支持分页）
- `GET /api/permissions/{id}` - 获取权限详情
- `POST /api/permissions` - 创建权限
- `PUT /api/permissions/{id}` - 更新权限
- `DELETE /api/permissions/{id}` - 删除权限

### 环境配置

在项目根目录创建 `.env` 文件（可选）：

```env
REACT_APP_API_URL=http://localhost:8080/api
```

或在启动时指定：

```bash
REACT_APP_API_URL=http://your-api-url npm start
```

### API响应格式

期望的API响应格式：

#### 登录响应
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "1",
      "username": "admin",
      "email": "admin@example.com",
      "realName": "管理员",
      "status": "ACTIVE",
      "roles": [
        {
          "id": "1",
          "name": "管理员",
          "description": "系统管理员"
        }
      ]
    }
  }
}
```

#### 列表响应（分页）
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "1",
      "name": "User Name"
    }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 10
}
```

#### 操作响应
```json
{
  "code": 200,
  "message": "Operation successful"
}
```

## 使用说明

### 登录
1. 访问应用首页，进入登录页面
2. 输入用户名和密码进行登录
3. 登录成功后将重定向到仪表板

### 用户管理
1. 在左侧菜单点击"用户管理"
2. 可以查看所有用户列表
3. 点击"添加用户"创建新用户
4. 点击"编辑"修改用户信息
5. 点击"删除"删除用户（需要确认）

### 角色管理
1. 在左侧菜单点击"角色管理"
2. 可以查看所有角色列表
3. 点击"添加角色"创建新角色
4. 点击"编辑"修改角色信息
5. 点击"分配权限"为角色分配权限

### 权限管理
1. 在左侧菜单点击"权限管理"
2. 可以查看所有权限列表
3. 点击"添加权限"创建新权限
4. 权限编码自动根据资源和操作生成（格式：resource:action）

## 核心组件说明

### 认证系统
- `AuthContext`: 提供全局认证状态
- `useAuth()`: Hook用于获取认证信息
- `ProtectedRoute`: 保护需要认证的路由

### 状态管理
- `useAuthStore()`: Zustand存储，管理认证状态和用户信息
- 支持本地存储持久化

### API调用
- `httpClient`: 配置好的Axios实例
- 自动在请求头添加Bearer token
- 401时自动清除认证信息并跳转登录页

## 常见问题

### Q: 如何处理跨域问题？
A: 后端需要配置CORS。参考Spring Boot配置：
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### Q: 如何修改API基础URL？
A: 修改 `src/config/api.ts` 中的 `API_BASE_URL` 或设置环境变量 `REACT_APP_API_URL`

### Q: Token如何保存和刷新？
A: Token保存在localStorage中。需要实现Token刷新逻辑，建议在后端处理Token过期和刷新。

## 许可证

MIT

## 开发者

Created with ❤️ by [Your Name]
