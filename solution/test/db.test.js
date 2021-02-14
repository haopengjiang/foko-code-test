const mysql = require("mysql");

describe('Access to database', function(){
    it('should connec to database ', function(done){
        var connection = mysql.createConnection({
            host: "localhost",
            port: 3333,
            user: "mysql",
            password: "password",
            database: "foko",
        });
        connection.connect(done);
    });
});