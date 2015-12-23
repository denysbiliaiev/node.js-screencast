'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;



var commentSchema = new Schema({
    title     : {
      type: String,
      required: true
    }
  , body      : String
  , date      : Date
});

var postSchema = new Schema({
    author    : ObjectId
  , title     : String
  , body      : String
  , date      : Date
  , comments  : [{
    type: ObjectId, 
    ref: 'Comment'
  }]
  , meta      : {
        votes : Number
      , favs  : Number
    }
});

postSchema.methods.sayHi = function() {
  console.log(this.title);
};

var Comment = mongoose.model('Comment', commentSchema);
var BlogPost = mongoose.model('BlogPost', postSchema);

// create a blog post
var post = new BlogPost();
// post.sayHi();

var comment = new Comment({ title: "My comment"});

post.comments.push(comment);

Promise.resolve()
  .then(() => Comment.remove({}))
  .then(() => BlogPost.remove({}))
  .then(() => comment.save())
  .then(() => post.save())
  .then(() => {
    console.log(post);
    mongoose.disconnect();
  })
