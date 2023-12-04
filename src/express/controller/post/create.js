import MySQL from "../../../config/mysql.js";
import datetime from "date-and-time";

/**
    * 
    * @param {import("express").Request} request 
    * @param {import("express").Response} response 
*/
async function Create(request, response) {

    //Create response
    const _response = { message: "", success: false, data: [], redirect: "" };

    //Try and catch error
    try {

        //Get and check user
        const _userid = (typeof(request.session["game.user"]) !== "undefined") ? request.session["game.user"] : null;

        //If user not found then redirect to login
        if(typeof(_userid) == "undefined" || _userid == null) {
            _response.redirect = "#login";
            throw "No user found";
        };

        //Get query parameters
        const _postdate = datetime.format(new Date(), "YYYY/MM/DD HH:mm:ss");
        const _postcontent = request.query.content;
        const _postcoordinate = request.query.coordinate;
        const _postaddress = request.query.address;
        const _postaddressobj = request.query.addressobj;

        //Check post content
        if(typeof(_postcontent) == "undefined" || _postcontent.length < 2 || typeof(_postcoordinate) == "undefined" || _postcoordinate.length < 2
        || typeof(_postaddress) == "undefined" || _postaddress.length < 2 || typeof(_postaddressobj) == "undefined" || _postaddressobj.length < 2) {
            throw "Please post content";
        };

        //Create new mysql connection
        const _connection = new MySQL.Connection();

        //Connect to database
        await _connection.Connect();

        //Run query
        await _connection.Query("INSERT INTO `sns-post` (`UserID`,`Content`,`Coordinate`,`Address`,`AddressObject`,`Date`)VALUES(?,?,?,?,?,?);", [ _userid, _postcontent, _postcoordinate, _postaddress, _postaddressobj, _postdate ]);

        //Set response
        _response.success = true;

        //Close conenction
        _connection.Close();

    }
    catch(exception) {
        _response.message = exception;
    };

    //Send response
    response.send(_response);

};

//
export default Create;