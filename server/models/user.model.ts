import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {type: String,
    unique: true,
    required: 'Email is required',
    match: [/.+\@.+\..+/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: 'Password is required',
    validate: [(password) => {
      return password && password.length > 6
    }, 'Password should be at least 6 characters']
  },
  salt: String
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  const hashPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.password === hashPassword;
};

const User = mongoose.model('User', UserSchema);

export default User;
