const config = {
  db : 'mongodb://user:123123123@ds161487.mlab.com:61487/voting-app26',
  sessionSecret: process.env.SESSION_SECRET || 'prodsecretkey'
};

export default config;
