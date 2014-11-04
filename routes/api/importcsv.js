var importcsv = {

    csv_to_json: function (req, res) {
        var dirToUp = path.join(__dirname, '../../public/uploads'),
            new_path = path.join(dirToUp, files.file.name);
        
        var Converter = require("csvtojson").core.Converter;
        var fs = require("fs");
        var csvFileName = new_path;
        var csvConverter = new Converter();
        csvConverter.on("end_parsed", function (jsonObj) {
            console.log(jsonObj); //here is your result json object
        }).on("error", function (err) {
            console.log(err);
        });
        fs.createReadStream(csvFileName).pipe(csvConverter);
    }

};

module.exports = importcsv;