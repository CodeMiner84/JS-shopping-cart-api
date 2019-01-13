import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const UserSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
    },
    email: {
        type: String,
        required: 'Email is required',
    },
    password: {
        type: String,
        required: 'Password is required',
    },
});
