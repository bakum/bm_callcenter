var formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    util = require('util');

var Upfile = {

    onUploads: function (req, res) {
        var form = new formidable.IncomingForm();
        //form.uploadDir  = path.join(__dirname, '../../public/uploads');
        form.parse(req, function (err, fields, files) {
            var dirToUp = path.join(__dirname, '../../public/uploads'),
                old_path = files.file.path,
                new_path = path.join(dirToUp, files.file.name);
            fs.readFile(old_path, function (err, data) {
                fs.writeFile(new_path, data, function (err) {
                    fs.unlink(old_path, function (err) {
                        if (err) {
                            res.status(500);
                        } else {
                            var result = {"success": true, "file": files.file.name};
                            res.json(result);

                            var Converter = require("csvtojson").core.Converter;
                            var fs = require("fs");
                            var csvFileName = new_path;
                            var csvConverter = new Converter();
                            csvConverter.on("end_parsed", function (jsonObj) {
                                console.log(jsonObj); //here is your result json object
                            }).on("error", function(err){
                                console.log(err);
                            });
                            fs.createReadStream(csvFileName).pipe(csvConverter);
                        }
                    });
                });
            });
        });

        form.on('progress', function (bytesReceived, bytesExpected) {
            var percent_complete = (bytesReceived / bytesExpected) * 100;
            console.log(percent_complete.toFixed(2));
        });

        form.on('error', function (err) {
            console.error(err);
            res.status(500);
        });
    }
}

module.exports = Upfile;