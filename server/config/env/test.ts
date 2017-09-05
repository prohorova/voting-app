const config = {
  db : 'mongodb://localhost:27017/voting-app-test',
  sessionSecret: process.env.SESSION_SECRET || 'testsecretkey'
};

export default config;
