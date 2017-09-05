import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectMongo from 'connect-mongo';

import config from './config/config';
import setPassport from './config/passport';
import setRoutes from './routes';

const app = express();
const MongoStore = connectMongo(session);

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

mongoose.connect(config.db);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: db})
}));

setPassport();
app.use(passport.initialize());
app.use(passport.session());

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  if (!module.parent) {
    app.listen(app.get('port'), () => {
      console.log('Server listening on port ' + app.get('port'));
    });
  }

});

export { app };
