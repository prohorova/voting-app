import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
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
    required: 'Password is required'
  }
});

UserSchema.methods.hashPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
