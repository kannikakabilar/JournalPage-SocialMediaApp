/*
  User database stored using mongoose
*/
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

/*
Username and password must be provided when users signup.
The default value for other fields can be modified when the users edits their profile
*/
const UserSchema = new Schema({
    username: {type: String, required: true, min: 4, unique: true},
    password: {type: String, required: true},
    email: {type: String, default:''},
    lineOfWork: {type: String, default:'JournalPage Browser'},
    locatedAt: {type: String, default:'xxxxxxx, xx'},
    interests: {type: String, default:'Any post on JournalPage'},
    statusMessage: {type: String, default:'Welcome to my profile'},
    color: {type: String, default:'#00009c'},
}, {
    timestamps: true,
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;