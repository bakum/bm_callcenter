var db_options = require('../../models/options.js')
    , db = require('../../models/database.js')(db_options())
    , Kontr = db.models.app_kontragents;

var Kontragents = {

    create: function (req, res) {
        req.body.id = null;
        req.body.USERId = req.session.user_id;
        Kontr.create(req.body).success(function (kontr) {
            res.send({status: 'success'})
        }).error(function (err) {
            res.status(416).end();
        })

    },

    update: function(req, res) {
        Kontr.find(req.body.id).success(function (anotherKontr) {
            if (anotherKontr) {
                anotherKontr.updateAttributes(req.body).success(function () {
                    res.send({status: 'success'});
                }).error(function (err) {
                    res.status(416).end();
                });
            }
        }).error(function (err) {
            res.status(416).end();
        })

    },

    list: function (req, res) {
        Kontr.findAll({limit: req.query.limit, offset: req.query.start}).success(function (kontr) {
            Kontr.count().success(function (c) {
                var result = {
                    setlist: kontr,
                    totalCount: c
                };
                res.json(result);
            })
        }).error(function (err) {
            res.status(416).end();
        })
    },

    edit: function (req, res) {
        Kontr.find(req.params.id).success(function (anotherKontr) {
            if (anotherKontr) {
                anotherKontr.updateAttributes(req.body).success(function () {
                    res.send({status: 'success'});
                }).error(function (err) {
                    res.status(416).end();
                });
            }
        }).error(function (err) {
            res.status(416).end();
        })
    },

    del: function (req, res) {
        Kontr.find(req.params.id).success(function (anotherKontr) {
            if (anotherKontr) {
                anotherKontr.destroy().success(function () {
                    res.send({status: 'success'})
                }).error(function (err) {
                    res.status(416).end();
                });
            } else {
                res.status(416).end();
            }
        })
    }
}

module.exports = Kontragents;