var db_options = require('../../models/options.js')
    , db = require('../../models/database.js')(db_options())
    , Cont = db.models.app_contact_detail;


var Contacts = {

    create: function(req, res) {
        req.body.id = null;
        Cont.create(req.body).success(function (con) {
            res.send({status: 'success'})
        }).error(function (err) {
            res.status(416).end();
        })
    },

    update: function(req, res) {
        Cont.find(req.body.id).success(function (con) {
            if (con) {
                con.updateAttributes(req.body).success(function () {
                    res.send({status: 'success'});
                }).error(function (err) {
                    res.status(416).end();
                });
            }
        }).error(function (err) {
            res.status(416).end();
        })

    },

    edit: function (req, res) {
        Cont.find(req.params.id).success(function (con) {
            if (con) {
                con.updateAttributes(req.body).success(function () {
                    res.send({status: 'success'});
                }).error(function (err) {
                    res.status(416).end();
                });
            }
        }).error(function (err) {
            res.status(416).end();
        })
    },

    listDetail: function (req, res) {
        var filter = JSON.parse(req.query.filter),
            //Prop = filter[0].property,
            val = filter[0].value;

        Cont.findAll({where: {KONTRAGENTId: val},limit: req.query.limit, offset: req.query.start}).success(function (con) {
            Cont.count().success(function (c) {
                //console.log(con);
                var result = {
                    setlist: con,
                    totalCount: c
                };
                res.json(result);
            })
        }).error(function (err) {
            res.status(416).end();
        })
    },

    list: function (req, res) {
        Cont.findAll({limit: req.query.limit, offset: req.query.start}).success(function (con) {
            Cont.count().success(function (c) {
                var result = {
                    setlist: con,
                    totalCount: c
                };
                res.json(result);
            })
        }).error(function (err) {
            res.status(416).end();
        })
    },

    del: function (req, res) {
        Cont.find(req.params.id).success(function (con) {
            if (con) {
                con.destroy().success(function () {
                    res.send({status: 'success'})
                }).error(function (err) {
                    res.status(416).end();
                });
            } else {
                res.status(416).end();
            }
        })
    }

};

module.exports = Contacts;
