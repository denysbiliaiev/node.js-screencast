// Connecting w/ mongoose, schema, model, basic queries
var mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/test', {
  server: {
    socketOptions: {
      keepAlive: 1
    },
    poolSize:      5
  }
});

// this schema can be reused in another schema
var userSchema = new mongoose.Schema({
  email:   {
    type:     String,
    required: true,
    unique:   true
  },

  created: {
    type:    Date,
    default: Date.now
  }
});

// User.schema
var User = mongoose.model('User', userSchema);

var mary = new User({
  email: 'mary@mail.com'
});

// no error handling here (bad)
User.remove({}, function(err) {

  mary.save(function(err, result) {
    console.log(result);

    User.findOne({
      email: 'mary@mail.com'
    }, function(err, user) {
      console.log(user);

      // ... do more with mary

      // no unref!
      mongoose.disconnect();
    });

  });

});









