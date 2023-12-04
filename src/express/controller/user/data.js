import MySQL from "../../../config/mysql.js";

/**
    * 
    * @param {import("express").Request} request 
    * @param {import("express").Response} response 
*/
async function Data(request, response) {

    //Create response
    const _response = { message: "", success: false, data: [], redirect: "" };

    //Try and catch error
    try {

        //Get query parameters
        const _userid = (typeof(request.query.userid) !== "undefined") ? request.query.userid : ((typeof(request.signedCookies["game.user"]) !== "undefined") ? request.signedCookies["game.user"] : null);

        //Check for initial user id
        if(typeof(_userid) == "undefined" || _userid == null) {
            _response.redirect = "#login";
            throw "No user found";
        };

        //Create new mysql connection
        const _connection = new MySQL.Connection();

        //Connect to database
        await _connection.Connect();

        //Run query
        const _result = await _connection.Query(
            "SELECT "+
            "`ID` AS user_id, " +
            "`Name` as `user_name` " +
            "FROM `sns-user` WHERE `ID` = ?;"
        , [ _userid, _userid ]);

        //Check for data
        if(_result.length > 0) {

            //Set data
            _response.data = _result[0];
            _response.success = true;

            //Set session value if no user is present in query parameter
            if(typeof(request.query.userid) === "undefined") {
                request.session["game.user"] = _result[0].user_id;
            };

        }
        else {
            _response.redirect = "#login";
            _response.message = "No user found";
        };

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
export default Data;