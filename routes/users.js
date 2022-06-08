var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.get('/myprofile', function(req, res, next)
{
    if (!('user' in req.session))
    {
        res.sendStatus(403);
        console.log("not logged in");
        return;
    }
    res.send(JSON.stringify({
        name: req.session.user.first_name + " " + req.session.user.last_name,
        email: req.session.user.email
    }));
});

router.post('/update', function(req, res, next)
{
    req.pool.getConnection(function(err, conn)
    {
        if (err)
        {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        var newname = req.body.name;
        var newemail = req.body.email;
        var newpassword = req.body.newpassword;
        var names = str.split(/\s+/);

        // This request is made to target own profile
        if(!('targetid' in req.body))
        {
            var userID = res.session.user.user_id;

            var query = "UPDATE user SET email = ?, first_name = ?, last_name = ?, password = ? WHERE user_id = ?;";
            connection.query(query, [newemail, names[0], names[1], newpassword, userID]);
        }
        else
        {
            // Updating someone else's profile
            // Expect admin privelidge
            if (req.session.privilege != 1)
            {
                console.log("Someone tried to update someone else without privilege!");
                res.sendStatus(403);
                return;
            }

            var targetID = req.body.targetid;

            var query = "UPDATE user SET email = ?, first_name = ?, last_name = ?, password = ? WHERE user_id = ?;";
            connection.query(query, [newemail, names[0], names[1], newpassword, targetID]);
        }

        connection.release();
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(200);
    });
});