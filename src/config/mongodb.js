/**
*Configurations defined for environments (DEV,STAGING and PROD) for Mongo Database
*/

var node_env = process.env.NODE_ENV;
var config = {};
const MONGODB_LOCAL = "mongodb://localhost:27017/chefjoy";
const MONGODB_DEV = "mongodb://localhost:27017/chefjoy";
const MONGODB_PROD = "mongodb://10.0.0.210:27017/chefjoy";

if(node_env === "prod") {
    config = {
        "DBURL" : MONGODB_PROD,
        "ENV"   : "prod"
    };
} else if(node_env === "staging"){
    config = {
        "DBURL": MONGODB_STAGE,
        "ENV"   : "staging",
        "URL"  : ""
    };
} else if(node_env == "dev"){
    config = {
        "DBURL": MONGODB_DEV,
        "ENV"  : "dev",
        "BASE_URL"  : ""
    };
} else {
    config = {
        "DBURL" : MONGODB_LOCAL,
        "ENV"   : "local",
        "BASE_URL"  : ""
    };
}


module.exports = config;

