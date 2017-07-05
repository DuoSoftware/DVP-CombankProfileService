/**
 * Created by Waruna on 6/23/2017.
 */
var util = require('util')
var config = require("config");
var logger = require("dvp-common/LogHandler/CommonLogHandler.js").logger;
var messageFormatter = require("dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js");


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

    var jsonString;
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