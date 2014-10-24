/**
 * Sequelize ORM Models
 */
module.exports = function (db) {

    var Sequelize = db.module,
        Client = db.client;
    var crypto = require('crypto');

    var self = {
        app_users: Client.define('USERS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
                fullname: {type: Sequelize.STRING(200), allowNull: false},
                real_name: {type: Sequelize.STRING(100), allowNull: false},
                u_name: {type: Sequelize.STRING(200), allowNull: false},
                is_admin: {type: Sequelize.INTEGER(1), allowNull: false, defaultValue: 0},
                u_password: {type: Sequelize.STRING, allowNull: false, defaultValue: '1'},
                email: { type: Sequelize.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
                u_description: {type: Sequelize.STRING(1000), allowNull: true},
                lastLogin: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW
                }
            },
            {
                freezeTableName: true
            }),
        app_groups: Client.define('GROUPS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
                g_name: {type: Sequelize.STRING(200), primaryKey: true, allowNull: false},
                g_description: {type: Sequelize.STRING(1000), allowNull: true}
            },
            {
                freezeTableName: true,
                timestamps: false
            }),
        app_groupmembers: Client.define('GROUPMEMBERS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true}
            },
            {
                freezeTableName: true
            }),
        app_divisions: Client.define('DIVISIONS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
                fullname: {type: Sequelize.STRING(200), allowNull: false},
                deleted: {type: Sequelize.INTEGER(1), allowNull: false, defaultValue: 0},
                is_group: {type: Sequelize.INTEGER(1), allowNull: false, defaultValue: 0}
            },
            {
                freezeTableName: true,
                timestamps: false
            }),
        app_divisions_sotr: Client.define('DIVISIONS_SOTR', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true}
            },
            {
                freezeTableName: true,
                timestamps: false
            }),
        app_kontragents: Client.define('KONTRAGENTS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
                fullname: {type: Sequelize.STRING(200), allowNull: false},
                deleted: {type: Sequelize.INTEGER(1), allowNull: false, defaultValue: 0},
                inn: {type: Sequelize.STRING(50), allowNull: true},
                okpo: {type: Sequelize.STRING(50), allowNull: true},
                kpp: {type: Sequelize.STRING(50), allowNull: true},
                namefull: {type: Sequelize.STRING(200), allowNull: false},
                ur_fiz: {type: Sequelize.INTEGER(1), allowNull: false, defaultValue: 0}
            },
            {
                freezeTableName: true,
                timestamps: false
            }),
        app_contact_detail: Client.define('CONTACT_DETAILS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
                adress: {type: Sequelize.STRING(1000), allowNull: true},
                phone: {type: Sequelize.STRING(15), allowNull: true},
                email: {type: Sequelize.STRING(100), allowNull: true}
            },
            {
                freezeTableName: true
            }),
        app_compaigns: Client.define('COMPAIGNS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
                name: {type: Sequelize.STRING(100), allowNull: false},
                enabled: {type: Sequelize.INTEGER(1), allowNull: false, defaultValue: 0},
                deleted: {type: Sequelize.INTEGER(1), allowNull: false, defaultValue: 0}
            },
            {
                freezeTableName: true
            }),
        app_compaigns_detail: Client.define('COMPAIGNS_DETAILS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true}
            },
            {
                freezeTableName: true
            }),
        app_call_results: Client.define('CALL_RESULTS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
                fullname: {type: Sequelize.STRING(20), allowNull: false},
                name: {type: Sequelize.STRING(20), allowNull: false}
            },
            {
                freezeTableName: true,
                timestamps: false
            }),
        app_call_status: Client.define('CALL_STATUS', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
                fullname: {type: Sequelize.STRING(20), allowNull: false},
                name: {type: Sequelize.STRING(20), allowNull: false}
            },
            {
                freezeTableName: true,
                timestamps: false
            }),
        app_call_log: Client.define('CALL_LOG', {
                id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
                memo: {type: Sequelize.TEXT, allowNull: false}
            },
            {
                freezeTableName: true
            })
    };
    self.app_divisions.hasMany(self.app_divisions, {onDelete: 'CASCADE'});
    self.app_users.hasMany(self.app_divisions_sotr);
    self.app_users.hasMany(self.app_divisions);
    self.app_groups.hasMany(self.app_groupmembers);
    self.app_users.hasMany(self.app_groupmembers);
    self.app_divisions.hasMany(self.app_kontragents);
    self.app_divisions.hasMany(self.app_divisions_sotr);
    self.app_kontragents.hasMany(self.app_kontragents, {onDelete: 'CASCADE'});
    self.app_kontragents.hasMany(self.app_contact_detail, {onDelete: 'CASCADE'});
    self.app_compaigns.hasMany(self.app_compaigns_detail, {onDelete: 'CASCADE'});
    self.app_kontragents.hasMany(self.app_compaigns_detail, {onDelete: 'CASCADE'});
    self.app_contact_detail.hasMany(self.app_compaigns_detail, {onDelete: 'CASCADE'});
    self.app_call_status.hasMany(self.app_call_log, {onDelete: 'CASCADE'});
    self.app_call_results.hasMany(self.app_call_log, {onDelete: 'CASCADE'});
    self.app_contact_detail.hasMany(self.app_call_log, {onDelete: 'CASCADE'});
    self.app_compaigns_detail.hasMany(self.app_call_log, {onDelete: 'CASCADE'});
    return self;
};