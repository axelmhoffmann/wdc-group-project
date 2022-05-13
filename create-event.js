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
        { name: 'Homer Simpson', image: 'homer.png' },
        { name: 'Marge Simpson', image: 'marge.png' },
        { name: 'Glenn Quagmire', image: 'quagmire.png' },
        { name: 'McLovin', image: 'mclovin.png' }
      ]
    }
  })

  function inviteUser(index)
  {

  }