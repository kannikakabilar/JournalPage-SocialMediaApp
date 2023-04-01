/*
  Post database stored using mongoose
*/
const mongoose = require('mongoose');
const {Schema,model} = mongoose;
/*
  Each node Post DB in mongoose contains info about its title, summary, ...
  (author refers to the UserDB collection) 
*/
const PostSchema = new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    likes:{type:Number, default:0},
    author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
    timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;