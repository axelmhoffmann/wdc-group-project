var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/events', function(req, res, next) {
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

router.post('/events', function(req, res) {
    req.pool.getConnection( function(err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        var query = "INSERT INTO event(event_name, event_date, event_desc, event_place) VALUES('" + req.body.event_name + "', '" + req.body.event_date + "', '" + req.body.event_desc + "', '" + req.body.event_place + "');";
        connection.query(query, function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
        });
    });
});

module.exports = router;
