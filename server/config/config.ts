import devConfig from './env/development';
import prodConfig from './env/production';
import testConfig from './env/test';

let config;

switch (process.env.NODE_ENV) {
  case 'development':
    config = devConfig;
    break;
  case 'production':
    config = prodConfig;
    break;
  case 'test':
    config = testConfig;
    break;
  default:
    config = devConfig;
}

export default config;

