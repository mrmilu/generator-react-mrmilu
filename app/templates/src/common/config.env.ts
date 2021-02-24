/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// IMPORTANT: Add environment variables in env/development.env file or add process.env variables in snowpack.config.js

export class ConfigEnv {
  static IS_DEV = import.meta.env.SNOWPACK_PUBLIC_API_URL === 'development';
  static NODE_ENV: string = import.meta.env.SNOWPACK_PUBLIC_NODE_ENV || 'development';
  static API_URL: string = import.meta.env.SNOWPACK_PUBLIC_API_URL || '';
  static SENTRY_URL: string = import.meta.env.SNOWPACK_PUBLIC_SENTRY_URL || '';
  static PACKAGE_NAME: string = import.meta.env.SNOWPACK_PUBLIC_PACKAGE_NAME || 'unknown-package';
  static PACKAGE_VERSION: string = import.meta.env.SNOWPACK_PUBLIC_PACKAGE_VERSION || '0.0.0-development';
}
