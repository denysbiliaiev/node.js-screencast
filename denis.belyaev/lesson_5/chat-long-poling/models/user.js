//когда мы запрашиваем у MongoDB какие-либо данные, то она возвращает курсор
//получение данных из MongoDB сводится к получению «курсора», который отдаёт эти данные по мере надобности.
var mongoose = require('./libs/mongoose');
var schema = require('mongoose').Schema();