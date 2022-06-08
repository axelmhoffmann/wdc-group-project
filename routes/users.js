var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

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
        // aughashfjkdlkjhgfhaiksmnbvcdfg
        var userID = res.session.user.user_id;
        var query = "UPDATE user SET email, first_name, last_name, password WHERE ";
    });
});