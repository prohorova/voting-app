const config = {
  db : 'mongodb://localhost:27017/voting-app',
  sessionSecret: process.env.SESSION_SECRET || 'devsecretkey'
};

export default config;
