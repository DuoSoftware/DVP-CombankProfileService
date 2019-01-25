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
        var jsonString = messageFormatter.FormatMessage(err, "ERROR", false, []);
        logger.debug('[DVP-CDRProcessor.GetExternalUserFacility] - [%s] - API RESPONSE : %s', reqId, jsonString);
        res.end(jsonString);
    });

};

module.exports.getImportantData = function (req, res) {
    logger.info('getImportantData');
    var jsonString = messageFormatter.FormatMessage(undefined, "Method Not Implemented", false, null);
    res.end(jsonString);
};

module.exports.getProfileDataFacetone = function (req, res) {
    logger.info('getProfileDataFacetone');
    var jsonString = messageFormatter.FormatMessage(undefined, "Method Not Implemented", false, null);
    res.end(jsonString);
};

module.exports.profileSearch = function (req, res) {
    logger.info('profileSearch');
    var jsonString = messageFormatter.FormatMessage(undefined, "Method Not Implemented", false, null);
    res.end(jsonString);
};

module.exports.saveImageFile = function (req, res) {
    logger.info('saveImageFile');
    var jsonString = messageFormatter.FormatMessage(undefined, "Method Not Implemented", false, null);
    res.end(jsonString);
};