// IMPORTANT: Define import.meta environment variables in types/static.d.ts and add variables in snowpack.config.js (packageOptions.env)

export class ConfigEnv {
  static IS_DEV = import.meta.env.NODE_ENV === 'development';
  static NODE_ENV = import.meta.env.NODE_ENV || 'development';
  static API_URL = import.meta.env.API_URL || '';
  static SENTRY_URL = import.meta.env.SENTRY_URL || '';
  static PACKAGE_NAME = import.meta.env.PACKAGE_NAME || 'unknown-package';
  static PACKAGE_VERSION = import.meta.env.PACKAGE_VERSION || '0.0.0-development';
}
