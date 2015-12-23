//когда мы запрашиваем у MongoDB какие-либо данные, то она возвращает курсор
//получение данных из MongoDB сводится к получению «курсора», который отдаёт эти данные по мере надобности.
//var crypto = require('crypto');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', schema);


