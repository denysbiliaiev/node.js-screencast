var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Comments = new Schema({
    title     : String
  , body      : String
  , date      : Date
});

var BlogPost = new Schema({
    author    : ObjectId
  , title     : String
  , body      : String
  , date      : Date
  , comments  : [Comments]
  , meta      : {
        votes : Number
      , favs  : Number
    }
});

mongoose.model('BlogPost', BlogPost);

// retrieve my model
var BlogPost = mongoose.model('BlogPost');

// create a blog post
var post = new BlogPost();

// create a comment
post.comments.push({ title: 'My comment' });

post.save(function (err) {

  console.log(post);
  if (!err) console.log('Success!');
  mongoose.disconnect();
});

