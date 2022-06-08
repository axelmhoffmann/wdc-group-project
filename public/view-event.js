function toggleShare()
{
    var overlay = $("#share-overlay")[0];
    overlay.style.display = "block";
}

function hideShare()
{
    var overlay = $("#share-overlay")[0];
    overlay.style.display = "none";
}

function getEventIndex() {
    const urlParams = new URLSearchParams(window.location.search);
  return Number(urlParams.get('i'));
}

function getPeopleGoing(index) {
    return 32;
}

function getPeopleMaybeGoing(index) {
    return 42;
}

var app = new Vue({
    el: '#app',
    data: {
      event: {},
    },
    methods: {
        getEvent: function() {
            var xhttp = new XMLHttpRequest();
          xhttp.open("GET", "/event?event_id="+getEventIndex());
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  app.event = JSON.parse(this.responseText);
                }
            };
          xhttp.send();
        }
    }
});

let xhttp = new XMLHttpRequest();

let loggedin = false;
xhttp.onreadystatechange = function ()
{
    if (this.readyState == 4 && this.status == 200)
    {
      if (JSON.parse(this.responseText) === true) {
        loggedin = true;
      }
    }
};

xhttp.open("GET", "/loggedin");
xhttp.send();

app.getEvent();
