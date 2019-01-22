/**
 * Created by Waruna on 6/23/2017.
 */
var util = require('util')
var config = require("config");
var logger = require("dvp-common/LogHandler/CommonLogHandler.js").logger;
var messageFormatter = require("dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js");
var fs = require('fs');


var mongomodels = require('dvp-mongomodels');
var ExternalCommercialUser = require('dvp-mongomodels/model/ExternalCommercialUser');


// mongomodels.mongoose.Promise = require('bluebird');

module.exports.getProfileData = function (req, res) {

    logger.info('getProfileData', req.params.Reference);

    ExternalCommercialUser.findOne({thirdpartyreference: req.params.Reference}).exec()
    .then(function(response){
        var jsonString = JSON.stringify(response);
        logger.info("getProfileData  - Data found  - [%s]", jsonString);
        res.end(jsonString);
    })
    .catch(function(err) {
        var jsonString = messageFormatter.FormatMessage(err, "ERROR", false, emptyArr);
        logger.debug('[DVP-CDRProcessor.GetExternalUserFacility] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);
    });

};

module.exports.getImportantData = function (req, res) {
    logger.info('getImportantData', req.params.Reference);
};

module.exports.getProfileDataFacetone = function (req, res) {
    logger.info('getProfileDataFacetone', req.params.Reference);
};

module.exports.profileSearch = function (req, res) {
    logger.info('profileSearch', req.params.Reference);
};

module.exports.saveImageFile = function (req, res) {
    pool.open(cn, function (err, dbCon) {
        if (err) {
            res.status(522);
            res.end(err.message);
        }
        else {

            /*File file = new File("picture.gif");
            InputStream istr = new FileInputStream("picture.gif");
            PreparedStatement pstmt = conn.prepareStatement
            ("INSERT INTO webimage (ident, fmt, data) VALUES (?, ?, ?)");
            pstmt.setString(1, "Picture");
            pstmt.setString(2, "GIF");
            pstmt.setBinaryStream(3, istr, (int)file.length());
            pstmt.execute();*/

           /* var pstmt = dbCon.prepare("INSERT INTO WARUNA.EMPLOYEE (EMPNO,FIRSTNME,PICTURE) VALUES (?, ?, ?);",function (err, data) {

            });
            pstmt.setString(1, "Picture");
            pstmt.setString(2, "GIF");
            pstmt.setBinaryStrea (3, istr, (int)file.length());
            pstmt.execute();*/

            fs.readFile("E:\\call_now_button.png", function (status, fd) {
                if (status) {
                    console.log(status.message);
                    return;
                }
                var base64Image = fd.toString('base64');
                var buffer = new Buffer(base64Image, 'base64');

                // var query ="INSERT INTO WARUNA.EMPLOYEE (EMPNO,FIRSTNME,PICTURE) VALUES ('img', 'test','" + buffer + "' );";
                //var query ="INSERT INTO WARUNA.TAB1 (COL1,COL2) VALUES (?,?);";
                dbCon.prepare("INSERT INTO WARUNA.TAB1 (COL1,COL2) VALUES (?,?)", function (err, stmt) {
                    if (err) {
                        //could not prepare for some reason
                        console.log(err);
                        return conn.closeSync();
                    }


                    //Bind and Execute the statment asynchronously
                    stmt.execute([1,buffer], function (err, result) {
                        if( err ) console.log(err);
                        else result.closeSync();

                        //Close the connection
                        conn.close(function(err){});
                    });
                });

                /*dbCon.query(query, function (er, da) {
                    if (er)throw er;
                });*/
            });

            /*var query = util.format(config.DBTWO.ImportantDataSp, req.params.Reference);
            dbCon.query(query, function (err, data) {
                if (err) {
                    res.status(444);
                    res.end(err.message);
                }
                else {
                    var newobj = {};
                    if (data && data.length) {
                        var key, keys = Object.keys(data[0]);
                        var n = keys.length;
                        while (n--) {
                            key = keys[n];
                            newobj[key.toLowerCase()] = data[0][key];
                        }
                    }

                    logger.info("getImportantData  - Data found  - [%s]", data);
                    res.end(JSON.stringify(newobj));
                }
                dbCon.close(function () {
                    logger.info("Connection Close.");
                })
            });*/
        }

    });


};