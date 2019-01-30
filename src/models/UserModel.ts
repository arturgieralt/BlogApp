import {Schema, model} from 'mongoose';

 export const UserSchema = new Schema({
     _id: Schema.Types.ObjectId,
     name: {type: String, required: [true, 'Please provide a username']},
     email: {type: String, required: [true, 'Please provide an email']}
 });

 export const UserModel = model('User', UserSchema, 'users');