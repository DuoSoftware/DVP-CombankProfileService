/**
 * Created by Waruna on 6/23/2017.
 */
var util = require('util')
var config = require("config");
var logger = require("dvp-common/LogHandler/CommonLogHandler.js").logger;
var messageFormatter = require("dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js");
var fs = require('fs');


var Pool = require("ibm_db").Pool
    , pool = new Pool()
    , cn = "DATABASE=" + config.DBTWO.Database + "; HOSTNAME=" + config.DBTWO.Host + "; PORT=" + config.DBTWO.Port + "; PROTOCOL=" + config.DBTWO.Protocol + "; UID=" + config.DBTWO.User + "; PWD=" + config.DBTWO.Password + ";";


module.exports.getProfileData = function (req, res) {

    var jsonString;
    pool.open(cn, function (err, dbCon) {
        if (err) {
            res.status(522);
            res.end(err.message);
        }
        else {
            var query = util.format(config.DBTWO.ProfileSp, req.params.Reference);
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

                    logger.info("getProfileData  - Data found  - [%s]", data);
                    res.end(JSON.stringify(newobj));
                }
                dbCon.close(function () {
                    logger.info("Connection Close.");
                })
            });
        }

    });


};

module.exports.getImportantData = function (req, res) {

    pool.open(cn, function (err, dbCon) {
        if (err) {
            res.status(522);
            res.end(err.message);
        }
        else {
            var query = util.format(config.DBTWO.ImportantDataSp, req.params.Reference);
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
            });
        }

    });


};

module.exports.getProfileDataFacetone = function (req, res) {

    var jsonString;
    pool.open(cn, function (err, dbCon) {
        if (err) {
            jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            logger.error("Fail To Open DB Connection : %s ", jsonString);
            res.end(jsonString);
            return console.log(err);
        }
        var query = util.format(config.DBTWO.ProfileSp, req.params.Reference);
        dbCon.query(query, function (err, data) {
            if (err) {
                jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, null);
                logger.error("getProfileData  - %s  ", jsonString);
                res.end(jsonString);
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

                logger.info("getProfileData  - Data found  - [%s]", data);
                jsonString = messageFormatter.FormatMessage(null, "SUCCESS", true, newobj);
                res.end(jsonString);
            }
            dbCon.close(function () {
                logger.info("Connection Close.");
            })
        });
    });


};

module.exports.profileSearch = function (req, res) {

    pool.open(cn, function (err, dbCon) {
        if (err) {
            res.status(522);
            res.end(err.message);
        }
        else {
            var query = util.format(config.DBTWO.ProfileSearchSp, req.params.SearchFiled,req.params.SearchValue);
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

                    logger.info("profileSearch  - Data found  - [%s]", data);
                    res.end(JSON.stringify(newobj));
                }
                dbCon.close(function () {
                    logger.info("Connection Close.");
                })
            });
        }

    });


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