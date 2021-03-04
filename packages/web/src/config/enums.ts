export enum Routes {
  ROOT = '/',
  LOGIN = '/login',
  ABOUT = '/about',
}

export enum StorageKey {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export const routesNameMapper = {
  [Routes.ROOT]: 'Home',
  [Routes.LOGIN]: 'Login',
  [Routes.ABOUT]: 'About',
};
