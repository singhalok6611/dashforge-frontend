/**
 * Permission utility functions for role-based access control
 */

export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

export const Permissions = {
  // App permissions
  APP_VIEW: ['ADMIN', 'EDITOR', 'VIEWER'],
  APP_CREATE: ['ADMIN', 'EDITOR'],
  APP_EDIT: ['ADMIN', 'EDITOR'],
  APP_DELETE: ['ADMIN'],

  // Page permissions
  PAGE_VIEW: ['ADMIN', 'EDITOR', 'VIEWER'],
  PAGE_CREATE: ['ADMIN', 'EDITOR'],
  PAGE_EDIT: ['ADMIN', 'EDITOR'],
  PAGE_DELETE: ['ADMIN', 'EDITOR'],

  // Data source permissions
  DATASOURCE_VIEW: ['ADMIN', 'EDITOR', 'VIEWER'],
  DATASOURCE_CREATE: ['ADMIN', 'EDITOR'],
  DATASOURCE_EDIT: ['ADMIN', 'EDITOR'],
  DATASOURCE_DELETE: ['ADMIN'],

  // Team management permissions
  USER_VIEW: ['ADMIN'],
  USER_INVITE: ['ADMIN'],
  USER_REMOVE: ['ADMIN'],
  USER_UPDATE_ROLE: ['ADMIN'],

  // Settings permissions
  SETTINGS_VIEW: ['ADMIN'],
  SETTINGS_EDIT: ['ADMIN'],
  PAYMENT_MANAGE: ['ADMIN'],

  // Query permissions
  QUERY_VIEW: ['ADMIN', 'EDITOR', 'VIEWER'],
  QUERY_CREATE: ['ADMIN', 'EDITOR'],
  QUERY_EDIT: ['ADMIN', 'EDITOR'],
  QUERY_DELETE: ['ADMIN', 'EDITOR'],
};

/**
 * Check if user has permission
 */
export function hasPermission(userRole: UserRole | string | undefined, permission: string[]): boolean {
  if (!userRole) return false;
  return permission.includes(userRole);
}

/**
 * Check if user can create apps
 */
export function canCreateApp(userRole: UserRole | string | undefined): boolean {
  return hasPermission(userRole, Permissions.APP_CREATE);
}

/**
 * Check if user can edit apps
 */
export function canEditApp(userRole: UserRole | string | undefined): boolean {
  return hasPermission(userRole, Permissions.APP_EDIT);
}

/**
 * Check if user can delete apps
 */
export function canDeleteApp(userRole: UserRole | string | undefined): boolean {
  return hasPermission(userRole, Permissions.APP_DELETE);
}

/**
 * Check if user can create data sources
 */
export function canCreateDataSource(userRole: UserRole | string | undefined): boolean {
  return hasPermission(userRole, Permissions.DATASOURCE_CREATE);
}

/**
 * Check if user can edit data sources
 */
export function canEditDataSource(userRole: UserRole | string | undefined): boolean {
  return hasPermission(userRole, Permissions.DATASOURCE_EDIT);
}

/**
 * Check if user can delete data sources
 */
export function canDeleteDataSource(userRole: UserRole | string | undefined): boolean {
  return hasPermission(userRole, Permissions.DATASOURCE_DELETE);
}

/**
 * Check if user can manage team
 */
export function canManageTeam(userRole: UserRole | string | undefined): boolean {
  return hasPermission(userRole, Permissions.USER_VIEW);
}

/**
 * Check if user can manage payments/billing
 */
export function canManagePayments(userRole: UserRole | string | undefined): boolean {
  return hasPermission(userRole, Permissions.PAYMENT_MANAGE);
}

/**
 * Check if user is admin
 */
export function isAdmin(userRole: UserRole | string | undefined): boolean {
  return userRole === 'ADMIN';
}

/**
 * Check if user is editor or admin
 */
export function isEditorOrAdmin(userRole: UserRole | string | undefined): boolean {
  return userRole === 'ADMIN' || userRole === 'EDITOR';
}

/**
 * Check if user is viewer only
 */
export function isViewer(userRole: UserRole | string | undefined): boolean {
  return userRole === 'VIEWER';
}

/**
 * Get user role display name
 */
export function getRoleDisplayName(role: UserRole | string | undefined): string {
  switch (role) {
    case 'ADMIN':
      return 'Administrator';
    case 'EDITOR':
      return 'Editor';
    case 'VIEWER':
      return 'Viewer';
    default:
      return 'Unknown';
  }
}

/**
 * Get role color classes for badges
 */
export function getRoleColorClasses(role: UserRole | string | undefined): string {
  switch (role) {
    case 'ADMIN':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'EDITOR':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'VIEWER':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}
