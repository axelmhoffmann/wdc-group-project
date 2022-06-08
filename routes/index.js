var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client('370599606648-6j68k3a9j3llq2nefq0657j93b01kllr.apps.googleusercontent.com');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next)
{
    // We have a standard login
    if ('user' in req.body && 'password' in req.body)
    {
      req.pool.getConnection(function(error,connection) {
        if (error) {
          console.log(error);
          res.sendStatus(500);
          return;
        }

        // empty password should login through google or use direct responses
        if (!req.body.user || !req.body.password) {
          res.sendStatus(400);
          return;
        }

        let query = "SELECT * FROM user WHERE email = ?;";
        connection.query(query, [req.body.user], async function(error, rows, fields) {
          connection.release();
          if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
          }
          if (rows.length > 0) {
            bcrypt.compare(req.body.password, rows[0].password).then(function(result) {
              if (result) {
                req.session.user = rows[0];
                res.sendStatus(200);
              } else {
                res.sendStatus(401);
              }
            });
          } else {
            res.sendStatus(401);
          }
        });
      });
    }
    // We have a google login
    else if ('token' in req.body)
    {
        var token = req.body.token;
      let email = null;
      let first_name = null;
      let last_name = null;
        // Process token
        async function verify()
        {
          const ticket = await client.verifyIdToken({
              idToken: token,
              audience: '370599606648-6j68k3a9j3llq2nefq0657j93b01kllr.apps.googleusercontent.com',
          });
          const payload = ticket.getPayload();
          const userid = payload['sub'];
          email = payload['email'];
          first_name = payload['given_name'];
          last_name = payload['family_name'];
        }

        verify().then(function()
        {
          req.pool.getConnection(function(error,connection) {
                if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
                }

                let query = "SELECT * FROM user WHERE email = ?;";
                connection.query(query, [email], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }
                if (rows.length > 0) {
                    connection.release();
                    req.session.user = rows[0];
                    res.sendStatus(200);
                } else {
                  query = "INSERT INTO user (email, first_name, last_name, password) VALUES (?, ?, ?, '');";
                  connection.query(query, [email, first_name, last_name], function(error, rows, fields) {
                    if (error) {
                      console.log(error);

function hideShare()
{
    var overlay = $("#share-overlay")[0];
    overlay.style.display = "none";
}

function hideShare()
{
    var overlay = $("#share-overlay")[0];
    overlay.style.display = "none";
}
                      res.sendStatus(500);
                      return;
                    }
                    let query = "SELECT * FROM user WHERE email = ?;";
                    connection.query(query, [email], function(error, rows, fields) {
                        connection.release();
                        if (error) {
                            console.log(error);
                            res.sendStatus(500);
                            return;
                        }
                        if (rows.length > 0) {
                            req.session.user = rows[0];
                            res.sendStatus(200);
                        } else {
                            res.sendStatus(401);
                        }
                    });
                  });
                }
                });
            });
        }).catch(function()
        {
            // Send 401 if fail
            res.sendStatus(401);
        });
    }
});

router.post('/signup', function(req, res, next)
{
  if (!req.body.email || !req.body.password) {
    res.sendStatus(400);
    return;
  }
  if ('email' in req.body && 'password' in req.body) {
    req.pool.getConnection(async function(error,connection) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }

      const hash = await bcrypt.hash(req.body.password, 10);

      let query = "INSERT INTO user (first_name, last_name, email, password, privilege) VALUES (?, ?, ?, ?, 0);";
      connection.query(query, [req.body.first_name, req.body.last_name, req.body.email, hash], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        let query = "SELECT * FROM user WHERE email = ?;";
        connection.query(query, [req.body.email], function(error, rows, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (rows.length > 0) {
                res.sendStatus(200);
            } else {
                console.log(error);
                res.sendStatus(401);
            }
        });
      });
    });
  }
});

router.get('/events', function(req, res, next) {
  if (!req.session.user) {
    res.sendStatus(403);
    return;
  }
    req.pool.getConnection( function(err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        var query = "SELECT image, event_name, event_desc, event_place, event_date FROM event";
        connection.query(query, function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

router.get('/event', function(req, res, next) {
  if ('event_id' in req.query) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

      let event_id = req.query.event_id;

        var query = "SELECT image, event_name, event_desc, event_place, event_date FROM event where event_id = ?";
        connection.query(query, [event_id], function(err, rows, fields) {
            if (err) {
                res.sendStatus(500);
                return;
            }
          let data = rows[0];
          var query = "SELECT COUNT(*) count from response where event_id = ? and response = true";
          connection.query(query, [event_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
          data.going = rows[0].count;
            res.json(data);
            });
        });
    });
  } else {
    res.sendStatus(400);
  }
});

var image = "placeholder.jpg";

router.post('/events', function(req, res) {
    req.pool.getConnection( function(err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        var query = "INSERT INTO event(image, event_name, event_date, event_desc, event_place) VALUES(?, ?, ?, ?, ?);";
      connection.query(query, [image, req.body.event_name, req.body.event_date, req.body.event_desc, req.body.event_place], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
    });
});

router.get('/loggedin', function(req, res, next) {
  if (req.session.user) {
    res.json(true);
  } else {
    res.json(false);
  }
});

module.exports = router;
