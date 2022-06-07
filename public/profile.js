function getProfile()
{
    // SEND GET REQUEST TO SERVER TO GET PROFILE INFO BACK. ONLY IF OWN PROFILE
}

function updateProfile()
{
    var username = document.getElementById("user-name").value;
    var currentpassword = document.getElementById("user-password").value;
    var newemail = document.getElementById("user-email").value;
    var newpassword = document.getElementById("new-password").value;

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

    // TODO: HASH PASSWORDS IDK HOW DO THIS

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