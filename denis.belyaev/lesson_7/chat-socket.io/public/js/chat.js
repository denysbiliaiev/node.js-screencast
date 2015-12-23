var socket = io('', {
    'reconnection': false
});

window.onload = function() {
    room_form.addEventListener('submit', newMessage, false);
}

function newMessage() {
    var text = msgBox.value();
    msgBox.value('');

    socket.emit('message', text, function (text) {
        //current socket
        messages.innerText(text);
    });
};

socket
    .on('new_message', function(text) {
        //all except current
        ul.innerText(text);
    })
    .on('connect', function() {
        console.log('connect');
    })
    .on('disconnect', function() {
        console.log('disconnect');
        recconect();
    })
    .on('error', function(err) {
        console.log('error: ' + err);
    })
    .on('reconnect_attempt', function() {
        console.log('reconnect_attempt');
    })
    .on('reconnecting', function(num) {
        console.log('reconnecting: ' + num);
    })
    .on('reconnect', function(num) {
        console.log('reconnect: ' + num);
    })
    .on('reconnect_error', function(err) {
        console.log('reconnect_error: ' + err);
    });

//    emit = socket.emit;
//
//    socket.emit = function(event) {
//        console.log(event);
//        emit.apply(socket, arguments);
//    }

function recconect() {
    socket.once('connect_error', function() {
        setTimeout(recconect, 100);
    });

    socket.connect();
}
