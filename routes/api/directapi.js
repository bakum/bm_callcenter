var express = require('express');
var router = express.Router(),
    kontr = require('./kontragents'),
    con = require('./contacts'),
    divs = require('./divisions')
    usrs = require('./users'),
    up = require('./uploads')


router.get('/loggedin', usrs.autstate);
router.post('/autuser', usrs.login);
router.get('/logout', usrs.logout);
router.get('/kontragents', kontr.list);
router.get('/contacts', con.listDetail);
router.post('/contacts', con.create);
router.put('/contacts/:id', con.edit);
router.delete('/contacts/:id', con.del);
router.put('/kontragents/:id', kontr.edit);
router.post('/kontragents', kontr.create);
router.post('/kontragents/update', kontr.update);
router.delete('/kontragents/:id', kontr.del);
router.get('/divisions', divs.list);
router.post('/uploads', up.onUploads);


module.exports = router;