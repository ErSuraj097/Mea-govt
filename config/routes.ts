export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  COMPLIANCE: '/compliance',
  HOW_TO_USE: '/how-to-use',
  RESOURCES: '/resources',
  LOGIN: '/login',
  VERIFY_CERTIFICATE: '/certificates/verify',
  DASHBOARD: {
    ROOT: '/dashboard',
    STUDENT: '/dashboard/student',
    TEACHER: '/dashboard/teacher',
    ADMIN: '/dashboard/admin',
    CREATOR: '/dashboard/creator',
    TESTER: '/dashboard/tester',
    INSTITUTE: '/dashboard/institute',
    ACCOUNTING: '/dashboard/accounting',
  },
} as const;
