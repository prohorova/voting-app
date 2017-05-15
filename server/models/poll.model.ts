import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  value: {type: String, required: true},
  votes: {type: Number, default: 0}
});

const PollSchema = new Schema({
  name: String,
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  options: [OptionSchema],
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],  // authenticated users who voted in this poll
  ips: [{type: String}] // ips of users who voted in this poll
});

const Poll = mongoose.model('Poll', PollSchema);

export default Poll;


