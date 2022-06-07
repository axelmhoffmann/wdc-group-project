function getProfile()
{
    // SEND GET REQUEST TO SERVER TO GET PROFILE INFO BACK. ONLY IF OWN PROFILE
    var name = 'Quandale Dingle';
    var email = 'quandingle@dingletonhigh.com';

    document.getElementById("user-name").value = name;
    document.getElementById("user-email").value = email;
}

function updateProfile()
{
    var username = document.getElementById("user-name").value;
    var currentpassword = document.getElementById("user-password").value;
    var newemail = document.getElementById("user-email").value;
    var newpassword = document.getElementById("new-password").value;

    // TODO: Encrypt passwords

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

    xhttp.open("POST", "/updateuser")
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        name: username,
        currentpassword: currentpassword,
        newemail: newemail,
        newpassword: newpassword
    }));
}


getProfile();