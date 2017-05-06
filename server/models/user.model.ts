import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"]
  },
  password: {
    type: String,
    validate: [(password) => {
      return password && password.length > 6
    }, 'Password should be at least 6 characters']
  },
  salt: String,
  provider: {type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {}
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  const hashPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.password === hashPassword;
};

const User = mongoose.model('User', UserSchema);

export default User;
