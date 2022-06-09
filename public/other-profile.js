function targetID()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

function getProfile()
{
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function ()
    {

        if (this.readyState == 4 && this.status == 200)
        {
            var response = JSON.parse(this.responseText);
            document.getElementById("user-name").value = response.name;
            document.getElementById("user-email").value = response.email;
        }
        else if (this.readyState == 4 && this.status >= 400)
        {
            console.log("get profile failed");
            window.location.replace("login.html");
        }
    };

    xhttp.open("GET", "/users/other?id=" + targetID)
    xhttp.send();
}

function updateProfile()
{
    var username = document.getElementById("user-name").value;
    var newemail = document.getElementById("user-email").value;
    var newpassword = document.getElementById("new-password").value;
    var privilege = document.getElementById("privilege").value;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log("update successful");
            window.location.replace("events.html");
        }
        else if (this.readyState == 4 && this.status >= 400)
        {
            console.log("update failed");
        }
    };

    xhttp.open("POST", "/users/update")
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        name: username,
        newemail: newemail,
        newpassword: newpassword,
        targetid: targetID()
    }));
}
getProfile();