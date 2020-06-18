var PropertiesReader = require('properties-reader');

const properties = PropertiesReader('./const/server.constants')

/** IS PRODUCTION **/
export const PROD = properties.get("server.env.prod") ? properties.get("server.env.prod") : false;
export const SKIP_AUTH = properties.get("server.env.skipauth") ? properties.get("server.env.skipauth") : false;

/** SERVER **/
export const HTTP_PORT = properties.get("server.http.port") ? properties.get("server.http.port") : 3000;
export const HTTPS_PORT = properties.get("server.https.port") ? properties.get("server.https.port") : 3443;
export const IT_WORKS = "It works";

/** DATABASE **/
export const MONGO_URL = properties.get("database.mongo.url") ? properties.get("database.mongo.url") : "mongodb://localhost:27017/ielponet?authSource=admin";
export const MONGO_USER = properties.get("database.mongo.user") ? properties.get("database.mongo.user") : "user";
export const MONGO_PWD = properties.get("database.mongo.pwd") ? properties.get("database.mongo.pwd") : "pwd";