var db_options = require('../../models/options.js')
    , db = require('../../models/database.js')(db_options())
    , Cont = db.models.app_contact_detail;


var Contacts = {

    listDetail: function (req, res) {
        var filter = JSON.parse(req.query.filter),
            //Prop = filter[0].property,
            val = filter[0].value;

        Cont.find({where: {KONTRAGENTId: val},limit: req.query.limit, offset: req.query.start}).success(function (con) {
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
    }

};

module.exports = Contacts;
