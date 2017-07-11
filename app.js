/**
 * Created by Waruna on 6/22/2017.
 */

var restify = require('restify');
var cors = require('cors');
var messageFormatter = require('dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js');

var config = require('config');

var port = config.Host.port || 3000;
var version = config.Host.version;
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var dbHandler = require('./dbHandler');


//-------------------------  Restify Server ------------------------- \\
var RestServer = restify.createServer({
    name: "campaignmanager",
    version: '1.0.0'
});

restify.CORS.ALLOW_HEADERS.push('authorization');
RestServer.use(restify.CORS());
RestServer.use(restify.fullResponse());

//Server listen
RestServer.listen(port, function () {
    console.log('%s listening at %s', RestServer.name, RestServer.url);
});

//Enable request body parsing(access)
RestServer.use(restify.bodyParser());
RestServer.use(restify.acceptParser(RestServer.acceptable));
RestServer.use(restify.queryParser());
RestServer.use(cors());

// ---------------- Security -------------------------- \\
var jwt = require('restify-jwt');
var secret = require('dvp-common/Authentication/Secret.js');
var authorization = require('dvp-common/Authentication/Authorization.js');
RestServer.use(jwt({secret: secret.Secret}));
// ---------------- Security -------------------------- \\


//-------------------------  Restify Server ------------------------- \\

RestServer.get('/DVP/API/' + version + '/Profile/External/:Reference', authorization({
    resource: "myUserProfile",
    action: "read"
}), function (req, res, next) {
    try {

        logger.info('getProfileData  - Request received -  Data - %s ', JSON.stringify(req.body));

        if (!req.user || !req.user.tenant || !req.user.company)
            throw new Error("invalid tenant or company.");
        dbHandler.getProfileData(req,res);
    }
    catch (ex) {
        res.status(400);
        res.end(ex.message);
    }
    return next();
});

RestServer.get('/DVP/API/' + version + '/Profile/ImportantData/:Reference', authorization({
    resource: "myUserProfile",
    action: "read"
}), function (req, res, next) {
    try {

        logger.info('getProfileImportantData  - Request received -  Data - %s ', JSON.stringify(req.body));

        if (!req.user || !req.user.tenant || !req.user.company)
            throw new Error("invalid tenant or company.");
        dbHandler.getImportantData(req,res);
    }
    catch (ex) {
        res.status(400);
        res.end(ex.message);
    }
    return next();
});

RestServer.get('/DVP/API/' + version + '/Profile/External/:Reference/facetone', authorization({
    resource: "myUserProfile",
    action: "read"
}), function (req, res, next) {
    try {

        logger.info('getProfileData  - Request received -  Data - %s ', JSON.stringify(req.body));

        if (!req.user || !req.user.tenant || !req.user.company)
            throw new Error("invalid tenant or company.");

        dbHandler.getProfileDataFacetone(req,res);
    }
    catch (ex) {

        logger.error('getProfileData - Exception occurred -  Data - %s ', JSON.stringify(req.body), ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.info('getProfileData - Request response : %s ', jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.get('/DVP/API/' + version + '/Profile/External/profile/image/test', authorization({
    resource: "myUserProfile",
    action: "read"
}), function (req, res, next) {
    try {

        logger.info('saveImageFile  - Request received -  Data - %s ', JSON.stringify(req.body));

        if (!req.user || !req.user.tenant || !req.user.company)
            throw new Error("invalid tenant or company.");

        dbHandler.saveImageFile(req,res);
    }
    catch (ex) {

        logger.error('saveImageFile - Exception occurred -  Data - %s ', JSON.stringify(req.body), ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.info('saveImageFile - Request response : %s ', jsonString);
        res.end(jsonString);
    }
    return next();
});