var db_options = require('../../models/options.js')
    , db = require('../../models/database.js')(db_options());
var crypto = require('crypto');

var Users = {
    login: function (req, res) {
        var Users = db.models.app_users;
        Users.find({where: {u_name: req.body.username}}).success(function (user) {
            if (user) {
                var shasum = crypto.createHash('sha1').update(req.body.password).digest('hex');
                if (shasum == user.u_password) {
                    req.session.user_id = user.id;
                    req.session.user_name = user.u_name;
                    res.send({success: 'true'})
                } else {
                    res.status(401).end();
                }

            } else {
                res.status(401).end();
            }

        })
    },

    autstate: function (req, res) {
        if (req.session.user_id) {
            res.send({success: 'true'})
        } else {
            res.status(401).end();

        }
    },

    logout: function (req, res) {
        var user;
        if (req.session) {
            user = req.session.user_name;
            req.session.destroy(function () {
            });
        }
        res.send({
            success: 'true',
            username: user
        });
    }
}

module.exports = Users;
