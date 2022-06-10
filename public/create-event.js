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
      users: [
        { name: 'Homer Simpson', image: 'images/homer.png' },
        { name: 'Marge Simpson', image: 'images/marge.png' },
        { name: 'Glenn Quagmire', image: 'images/quagmire.png' },
        { name: 'McLovin', image: 'images/mclovin.png' }
      ]
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
