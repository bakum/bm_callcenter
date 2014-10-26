var express = require('express');
var router = express.Router(),
    kontr = require('./kontragents'),
    usrs = require('./users');


router.get('/loggedin', usrs.autstate);
router.post('/autuser', usrs.login);
router.get('/logout', usrs.logout);
router.get('/kontragents', kontr.list);
router.put('/kontragents/:id', kontr.edit);
router.post('/kontragents', kontr.create);
router.delete('/kontragents/:id', kontr.del);


module.exports = router;