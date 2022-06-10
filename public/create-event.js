function createEvent()
{
    // Send event data to serer
    console.log("sending event to server :)");
}

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

var app = new Vue({
    el: '#app',
    data: {
      users: []
    },
    methods: {
      getUsers: function()
      {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/users/public");
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200)
          {
            app.users = JSON.parse(this.responseText);
            console.log(app.eventListings);
          }
          else if (this.status == 403)
          {
               window.location.replace("login.html");
          }
        };
        xhttp.send();
      }
    }
});

  function inviteUser(index)
  {

  }

function addEvent() {
    let name = document.getElementById("event-name").value;
    let desc = document.getElementById("event-desc").value;
    let place = document.getElementById("event-place").value;

    let date = document.getElementById("event-date").value;
    console.log(date);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/events", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };

    xhttp.send(JSON.stringify({event_name:name, event_date:date, event_desc:desc, event_place:place}));
}
