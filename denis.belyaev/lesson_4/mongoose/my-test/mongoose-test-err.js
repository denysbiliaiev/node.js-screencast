'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;
var co = require('co');

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

co(function* () {
    yield Comment.remove({})//если не указан callback, возвращается промис.
    yield BlogPost.remove({})
    asd
    yield comment.save()
    var test = yield post.save()
    return test//будет передано в ближайший then.
})
.catch(err => err)//{throw new Error('err')})
.then((res) => {
        console.log(res);
        mongoose.disconnect();
    },
    (err) => console.log(err)
);

