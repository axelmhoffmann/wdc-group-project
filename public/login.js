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