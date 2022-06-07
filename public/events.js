function getEventIndex() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('i');
}

function getPeopleGoing(index) {
    return 32;
}

function getPeopleMaybeGoing(index) {
    return 42;
}

function viewEvent(index) {
  window.location.href="view-event.html?i=" + index;
}

var app = new Vue({
    el: '#app',
    data: {
      eventListings: [],
    },
    methods: {
        displayEvents: function() {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "/events");
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    app.eventListings = JSON.parse(this.responseText);
                    console.log(app.eventListings);
                }
            };
            xhttp.send();
        }
    }
});
