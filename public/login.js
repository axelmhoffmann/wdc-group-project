function googleSignIn(googleUser)
{
    var profile = googleUser.getBasicProfile();
    var gtoken = googleUser.getAuthResponse().id_token;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log("login successful");
        }
        else if (this.readyState == 4 && this.status >= 400)
        {
            console.log("login failed");
        }
    };

    xhttp.open("POST", "/login")
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.sent(JSON.stringify({
        token: gtoken
    }));
}

function login()
{
    var email = document.getElementById("email").value;
    var pword = document.getElementById("password").value;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log("login successful");
            window.location.replace("events.html");
        }
        else if (this.readyState == 4 && this.status >= 400)
        {
            console.log("login failed");
        }
    };

    xhttp.open("POST", "/login")
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        user: email,
        password: pword
    }));
}

function signup()
{
    var email = document.getElementById("email").value;
    var pword = document.getElementById("password").value;

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log("signup successful");
        }
        else if (this.readyState == 4 && this.status >= 400)
        {
            console.log("login failed");
        }
    };

    xhttp.open("POST", "/signup")
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        user: email,
        password: pword
    }));
}