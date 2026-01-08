// API基础配置
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

// 用户相关API
export const USER_API = {
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
  getCurrentUser: `${API_BASE_URL}/auth/current`,
  getUserList: `${API_BASE_URL}/users`,
  getUserById: (id: string) => `${API_BASE_URL}/users/${id}`,
  createUser: `${API_BASE_URL}/users`,
  updateUser: (id: string) => `${API_BASE_URL}/users/${id}`,
  deleteUser: (id: string) => `${API_BASE_URL}/users/${id}`,
  assignRole: `${API_BASE_URL}/users/assign-role`,
  removeRole: `${API_BASE_URL}/users/remove-role`,
};

// 角色相关API
export const ROLE_API = {
  getRoleList: `${API_BASE_URL}/roles`,
  getRoleById: (id: string) => `${API_BASE_URL}/roles/${id}`,
  createRole: `${API_BASE_URL}/roles`,
  updateRole: (id: string) => `${API_BASE_URL}/roles/${id}`,
  deleteRole: (id: string) => `${API_BASE_URL}/roles/${id}`,
  assignPermission: `${API_BASE_URL}/roles/assign-permission`,
  removePermission: `${API_BASE_URL}/roles/remove-permission`,
  getRolePermissions: (roleId: string) => `${API_BASE_URL}/roles/${roleId}/permissions`,
};

// 权限相关API
export const PERMISSION_API = {
  getPermissionList: `${API_BASE_URL}/permissions`,
  getPermissionById: (id: string) => `${API_BASE_URL}/permissions/${id}`,
  createPermission: `${API_BASE_URL}/permissions`,
  updatePermission: (id: string) => `${API_BASE_URL}/permissions/${id}`,
  deletePermission: (id: string) => `${API_BASE_URL}/permissions/${id}`,
};
