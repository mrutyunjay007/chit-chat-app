//extarnal imports
const express = require("express");
const protected = require("../middlewares/isLoggedIn.middleware");
const {
  getAllConnections,
  searchConnection,
} = require("../controllers/connection.controller");

//Initialise Router
const connection = express.Router();

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  add a new connection
    api : /user/addconnection
    req : connection-cheetCode
    res : connectionInfo-{name,id} [201]/[400]/[500]   
*/
// connection.route("/addconnection").post(protected, addConnectionController);
/*  
    description :  get all connections
    api : /connection/
    method : GET [PROTECTED]
    req : 
    res : {connections} [200]/[500]  
*/
connection.route("/").get(protected, getAllConnections);
connection.route("/search").get(protected, searchConnection);

//EXPORT
module.exports = connection;
