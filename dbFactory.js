/**
 * Created by Waruna on 1/17/2019.
 */

const db_mongo_handler = require('./db_mongo_handler');
const db_two_handler = require('./db_two_handler');


const dbFactory = function(type){
    if(type === 'db_two'){
        return db_two_handler;
    } else if(type === 'mongo') {
        return db_mongo_handler;
    }
};

module.exports = dbFactory;