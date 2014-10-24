/**
 * Database Connection
 */
module.exports = function (options) {
    var database = {
        options: options
    };

    var Sequelize = require('sequelize');
    database.module = Sequelize;
    database.client = new Sequelize(options.schema, options.user, options.password, {
        host: options.host,
        port: options.port,
        logging: options.logging,
        dialect: 'mysql',
        maxConcurrentQueries: 100,
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    });

    /**
     * @type {Object}
     * Map all attributes of the registry
     * (Instance method useful to every sequelize Table)
     * @this {SequelizeRegistry}
     * @return {Object} All attributes in a Object.
     */
    database.map = function () {
        var obj = new Object(),
            ctx = this;
        ctx.attributes.forEach(function (attr) {
            obj[attr] = ctx[attr];
        });

        return obj;
    };
    database.sync = function (force, fn) {
        var f = force || false;
        if (fn)
            database.client.sync({force: f}).success(fn);
        else
            database.client.sync({force: f});
    };

    var mod = require('./models.js')(database);

    function fillfullTable() {
        var Seq = database.client;

        Seq.query("Select * from CALL_STATUS").success(function (rows) {
            console.log(rows);
            if (rows.length == 0)
                Seq.query("Insert into CALL_STATUS (NAME,FULLNAME) values ('New','Новый')").success(function () {
                    console.log("All ok!");
                    Seq.query("Insert into CALL_STATUS (NAME,FULLNAME) values ('Pending','В ожидании')").success(function () {
                        console.log("All ok!");
                        Seq.query("Insert into CALL_STATUS (NAME,FULLNAME) values ('FailedSubmit','Неудачный')").success(function () {
                            console.log("All ok!");
                        });
                    });
                });
        });
        Seq.query("Select * from CALL_RESULTS").success(function (rows) {
            console.log(rows);
            if (rows.length == 0) {
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('Sales','Продажа')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('WrongNumber','Неверный номер')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('Voicemail','Голосовая почта')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('PowerOff','Номер отключен')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('NoAnswer','Нет ответа')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('SendFax','Отправить факс')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('SendMail','Отправить почту')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('Success','Успешно')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('Fail','Неудача')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('AnswerMachine','Автоответчик')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('DontCallAgain','Больше не звонить')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('NotInterested','Не интересует')").success(function () {
                    console.log("All ok!");
                });
                Seq.query("Insert into CALL_RESULTS (NAME,FULLNAME) values ('CallLater','Перезвонить позже')").success(function () {
                    console.log("All ok!");
                });
            }
        });
        Seq.query("Select * from USERS").success(function (rows) {
            console.log(rows);
            if (rows.length == 0) {
                Seq.query("Insert into USERS (u_name, u_password, is_admin) values ('sysdba',sha1('1'),1)").success(function () {
                    console.log("New user inserted!");
                })
            }
        });
        Seq.query("Select * from GROUPS").success(function (rows) {
            console.log(rows);
            if (rows.length == 0) {
                Seq.query("Insert into GROUPS (g_name,g_description) values ('administrators','System administrators')").success(function () {
                    console.log("New group inserted!");
                });
                Seq.query("Insert into GROUPS (g_name,g_description) values ('managers','Call center managers')").success(function () {
                    console.log("New group inserted!");
                });
            }
        });
        Seq.query("Select * from GROUPMEMBERS").success(function (rows) {
            console.log(rows);
            if (rows.length == 0) {
                Seq.query("Insert into GROUPMEMBERS (GROUPId,USERId) values ((select id from GROUPS where upper(g_name) = upper('administrators')),(select id from USERS where upper(u_name) = upper('sysdba')))").success(function () {
                    console.log("New groupmember inserted!");
                });
            }
        });
        Seq.query("CREATE OR REPLACE VIEW `VW_GROUPMEMBER` AS select `GROUPS`.`g_name` AS `g_name`,`USERS`.`u_name` AS `u_name` from ((`GROUPS` join `GROUPMEMBERS` on((`GROUPS`.`id` = `GROUPMEMBERS`.`GROUPId`))) join `USERS` on((`GROUPMEMBERS`.`USERId` = `USERS`.`id`)));").success(function() {
            console.log("VW_GROUPMEMBER created!");
        });
    };

    database.models = mod;
    database.sync(false, fillfullTable);

    return database;
};