function subscribe() {
    fetch('/subscribe')
        .then((response) => {
            return response.text();
        })
        .then(function(message) {
            console.log(message);
            var li = document.createElement('li');
            li.textContent = message;
            messages.appendChild(li);

            subscribe();
        })
        .catch((err) => {
            console.log(err);
            setTimeout(1000, subscribe);
        })
}

window.onload = function() {
    publishForm.onsubmit = function(event) {
        event.preventDefault();
        var formData = new FormData(this);

        fetch('/publish', {method: 'post', body: formData})
            .then((response) => {
                return response.text()
            })
            .then(function(message) {
                console.log(`publish: ${message}`)
            })
            .catch((err) => {
                setTimeout(1000, subscribe);
            })

        console.log(`publish ${formData}`);
    }

    subscribe();
}

//function publish(message) {
//    console.log('publish');
//    fetch('/publish', {method: 'post', body: {message: message}})
//        .then((response) => {
//            return response.text()
//        })
//        .then(function(body) {
//            alert(body);
//        })
//        .catch((err) => {
//            setTimeout(1000, subscribe);
//        })
//}

