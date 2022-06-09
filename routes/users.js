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

router.get('/other', function(req, res)
{
    if (!('user' in req.session))
    {
        res.sendStatus(403);
        console.log("not logged in");
        return;
    }
    if (req.session.user.privilege < 1)
    {
        res.sendStatus(403);
        console.log("not an admin");
        return;
    }
    if (!('id' in req.query))
    {
        res.sendStatus(400);
        console.log("no id parameter");
        return;
    }

    req.pool.getConnection(function(err, connection)
    {
        if (err)
        {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        var target = req.query.id;
        var query = "SELECT email, first_name, last_name, privilege FROM user WHERE user_id = ?;";
        connection.query(query, [target], function(err, rows, fields){
            connection.release();
            if (err)
            {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            console.log(req.query.id);
            res.json(rows[0]);
        });
    });
});

router.post('/update', function(req, res, next)
{
    req.pool.getConnection(function(err, connection)
    {
        if (err)
        {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        var newname = req.body.name;
        var newemail = req.body.newemail;
        var newpassword = req.body.newpassword;
<<<<<<< HEAD

        let hash;
        if (req.body.password) {
            hash = await bcrypt.hash(newpassword, 10);
        } else {
            hash = '';
        }

        var names = str.split(/\s+/);
=======
        var names = newname.split(/\s+/);
        console.log([newemail, names[0], names[1], newpassword]);
>>>>>>> 2e2d9dc375b714c8506a0236e39686f2d2116255

        // This request is made to target own profile
        if(!('targetid' in req.body))
        {
            var userID = req.session.user.user_id;

            var query = "UPDATE user SET email = ?, first_name = ?, last_name = ?, password = ? WHERE user_id = ?;";
<<<<<<< HEAD
            connection.query(query, [newemail, names[0], names[1], hash, userID]);
=======
            connection.query(query, [newemail, names[0], names[1], newpassword, userID], function(err, result) {
                if (err) console.log(err);
            });
>>>>>>> 2e2d9dc375b714c8506a0236e39686f2d2116255
        }
        else
        {
            var privilege = 0;
            if ('privilege' in req.body)
            {
                privilege = req.body.privilege;
            }
            // Updating someone else's profile
            // Expect admin privelidge
            if (req.session.privilege != 1)
            {
                console.log("Someone tried to update someone else without privilege!");
                res.sendStatus(403);
                return;
            }

            var targetID = req.body.targetid;

            var query = "UPDATE user SET email = ?, first_name = ?, last_name = ?, privilege = ?, password = ? WHERE user_id = ?;";
            
            connection.query(query, [newemail, names[0], names[1], privilege, newpassword, targetID]);

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
