var express = require('express');
var bcrypt = require('bcrypt');
var nodemailer = require ('nodemailer');
var router = express.Router();
const {OAuth2Client} = require('google-auth-library');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'lionel.pollich37@ethereal.email',
      pass: '79ARPdab8CssFEQsUv'
  }
});

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

        if (!req.body.user) {
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
            if (rows[0].password === null) {
                res.sendStatus(401);
            } else if (rows[0].password === '') {
                req.session.user = rows[0];
                res.sendStatus(200);
            } else {
                bcrypt.compare(req.body.password, rows[0].password).then(function(result) {
                if (result) {
                    req.session.user = rows[0];
                    res.sendStatus(200);
                } else {
                    res.sendStatus(401);
                }
                });
            }
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
                  query = "INSERT INTO user (email, first_name, last_name) VALUES (?, ?, ?);";
                  connection.query(query, [email, first_name, last_name], function(error, rows, fields) {
                    if (error) {
                      console.log(error);
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
  if (!req.body.email) {
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

      let hash;
      if (req.body.password) {
        hash = await bcrypt.hash(req.body.password, 10);
      } else {
        hash = '';
      }

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
                req.session.user = rows[0];
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
        var query = "SELECT event_id, image, event_name, event_desc, event_place, event_date FROM event";
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
          if (err || rows.length < 1) {
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

router.post('/event/delete', function(req,res)
{
  if(!('event_id' in req.query))
  {
    res.sendStatus(400);
    return;
  }

  if(req.session.user.privilege  < 1)
  {
    res.sendStatus(403);
    return;
  }

  req.pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    let event_id = req.query.event_id;

    var query = 'DELETE FROM event WHERE event_id = ?;'
    connection.query(query, [event_id], function(err) {
      connection.release();
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.sendStatus(200);
      return;
    });
  });

});

var image = "placeholder.jpg";

router.post('/events', function(req, res) {
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

router.get('/loggedin', function(req, res, next){
  var val = false;
  var priv = 0;
  if ('user' in req.session)
    val = true;
    priv = req.session.user.privilege;
  res.json({val: val, privilege: priv});
});

router.post('/eventresponse', function(req, res) {
  if (!req.session.user) {
    res.sendStatus(403);
    return;
  }
  if ('event_id' in req.body && 'response' in req.body) {
    req.pool.getConnection( function(err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        var query = "INSERT INTO response (event_id, user_id, response) select ?,?,? WHERE (?, ?) NOT IN (SELECT event_id, user_id FROM response);";
        connection.query(query, [req.body.event_id, req.session.user.user_id, req.body.response, req.body.event_id, req.session.user.user_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });

        query = "SELECT user.email, user.first_name, event.event_name FROM event INNER JOIN user ON event.event_id;";
        connection.query(query, [req.body.event_id, req.session.user.user_id, req.body.response, req.body.event_id, req.session.user.user_id], function(err, rows, fields) {
          if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
          }
      });
        let info = transporter.sendMail({
            from: 'helpmeplease@davent.com',
            to: 'suyashkhanna112@gmail.com',
            subject: "Davent Event: ",
            text: "COME TO PARTY PLEASE",
        });

        connection.release();
        res.sendStatus(200);
    });
  }
});

module.exports = router;
