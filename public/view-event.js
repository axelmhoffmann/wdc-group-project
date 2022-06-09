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

var app = new Vue({
    el: '#app',
    data: {
      event: {},
      loggedin: false,
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
        },
      respond: function(going) {
        if (!app.loggedin) {
          alert("You are not logged in! Please provide some details");
          const email = prompt("Email Address");
          const first_name = prompt("First Name");
          const last_name = prompt("Last Name");
          if (!(!email || !first_name || !last_name)) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("post", "/signup");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open("post", "/eventresponse");
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({event_id: getEventIndex(), response: going}));
                    app.getEvent();
                }
            };
            xhttp.send(JSON.stringify({email: email, first_name: first_name, last_name: last_name, password: ''}));
          }
        } else {
            var xhttp = new XMLHttpRequest();
            xhttp.open("post", "/eventresponse");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({event_id: getEventIndex(), response: going}));
            app.getEvent();
        }
      },
    }
});

let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function ()
{
    if (this.readyState == 4 && this.status == 200)
    {
      if (JSON.parse(this.responseText) === true) {
        app.loggedin = true;
      }
    }
};

xhttp.open("GET", "/loggedin");
xhttp.send();

app.getEvent();
