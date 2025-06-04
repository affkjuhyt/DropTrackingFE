export type AuthRoutes = typeof PUBLIC_ROUTES.AUTH[keyof typeof PUBLIC_ROUTES.AUTH];

export const PUBLIC_ROUTES = {
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
} as const;

export const NO_NAVBAR_ROUTES: readonly AuthRoutes[] = [
  PUBLIC_ROUTES.AUTH.SIGNIN,
  PUBLIC_ROUTES.AUTH.SIGNUP,
  PUBLIC_ROUTES.AUTH.FORGOT_PASSWORD,
  PUBLIC_ROUTES.AUTH.RESET_PASSWORD,
];