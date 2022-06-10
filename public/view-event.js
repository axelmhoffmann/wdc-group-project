function share()
{
    var textArea = document.createElement("textarea");
    textArea.value = window.location;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try
    {
        var success = document.execCommand('copy');
        if(success)
          alert("Copied event link!");
    } catch (err)
    {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

/*
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
*/

function getEventIndex() {
    const urlParams = new URLSearchParams(window.location.search);
  return Number(urlParams.get('i'));
}

function makeUrl(event)
{
  console.log(app.event.event_name);
  console.log(app.event.event_place);
  var time = app.event.event_date.replace(/[-.:]/g,'');
  console.log(time);
  var result = "http://www.google.com/calendar/render?action=TEMPLATE&text=" + app.event.event_name + "&dates=[start-custom format='Ymd\THi00\Z']/[end-custom format='Ymd\THi00\Z']&details=[description]&location=[location]&trp=false&sprop=&sprop=name:"
  return result;
}

var app = new Vue({
    el: '#app',
    data: {
      event: {},
      url: "",
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
                  url = makeUrl(event);
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

let loggedin = false;
let privelege = 0;
xhttp.onreadystatechange = function ()
{
    if (this.readyState == 4 && this.status == 200)
    {
      var response = JSON.parse(this.responseText);
      if (response.val === true) {
        app.loggedin = true;
        privelege = response.privilege;

        if (privelege > 0)
        {
          var delbutton = document.getElementById("delbutton");
          delbutton.style.display = "block";
        }

      }
    }
};

xhttp.open("GET", "/loggedin");
xhttp.send();




app.getEvent();

function attemptDelete()
{
  if (privelege == 0)
    return;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
          window.location.replace("events.html");
        }
    };

    xhttp.open("POST", "/event/delete?event_id="+getEventIndex());
    xhttp.send();
}