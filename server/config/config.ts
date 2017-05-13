import devConfig from './env/development';
import prodConfig from './env/production';

const env = process.env.NODE_ENV || 'development';
const config = env === 'development' ? devConfig : prodConfig;

export default config;

