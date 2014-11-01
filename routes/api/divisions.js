var db_options = require('../../models/options.js')
    , db = require('../../models/database.js')(db_options())
    , Div = db.models.app_divisions;

var Divisions = {



    list: function (req, res) {
        Div.findAll().success(function (divs) {
            res.json(divs);
        }).error(function (err) {
            res.status(416).end();
        })
    }




}

module.exports = Divisions;