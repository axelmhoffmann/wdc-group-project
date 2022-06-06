var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next)
{
    // We have a standard login
    if ('user' in req.body && 'password' in req.body)
    {
        // Do SQL stuff here
    }
    // We have a google login
    else if ('token' in req.body)
    {
        // Do SQL stuff here
    }
});