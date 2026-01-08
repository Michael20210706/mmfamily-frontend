// 类型定义

// 用户类型
export interface User {
  id: string;
  username: string;
  email: string;
  realName?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  roles?: Role[];
  createdAt?: string;
  updatedAt?: string;
}

// 角色类型
export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions?: Permission[];
  createdAt?: string;
  updatedAt?: string;
}

// 权限类型
export interface Permission {
  id: string;
  name: string;
  code: string; // 权限编码，如 'user:create', 'role:edit'
  description?: string;
  resource: string; // 资源名称
  action: string; // 操作名称
  createdAt?: string;
  updatedAt?: string;
}

// 登录请求和响应
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// 分页响应
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// API响应
export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

// 分配角色请求
export interface AssignRoleRequest {
  userId: string;
  roleIds: string[];
}

// 分配权限请求
export interface AssignPermissionRequest {
  roleId: string;
  permissionIds: string[];
}

