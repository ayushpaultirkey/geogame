import MySQL from "../../../config/mysql.js";

/**
    * 
    * @param {import("express").Request} request 
    * @param {import("express").Response} response 
*/
async function List(request, response) {
    
    //Create response
    const _response = { message: "", success: false, data: [], redirect: "" };

    //Try and catch error
    try {

        //Get and check user
        const _userid = (typeof(request.query.userid) !== "undefined") ? request.query.userid : ((typeof(request.session["game.user"]) !== "undefined") ? request.session["game.user"] : null);

        //If user not found then redirect to login
        if(typeof(_userid) == "undefined" || _userid == null) {
            _response.redirect = "#login";
            throw "No user found";
        };

        //Create new mysql connection
        const _connection = new MySQL.Connection();

        //Connect to database
        await _connection.Connect();

        //Run query
        let _result = null;
        if(typeof(request.query.userid) == "undefined") {
            _result = await _connection.Query(" " +
                "SELECT " +
                "`sns-post`.`ID`            AS post_id, " +
                "`sns-post`.`Content`       AS post_content, " +
                "`sns-post`.`Coordinate`    AS post_coordinate, " +
                "`sns-post`.`Address`       AS post_address, " +
                "`sns-post`.`AddressObject` AS post_addressobj, " +
                "`sns-post`.`Date`          AS post_date, " +
                "`sns-post`.`UserID`        AS user_id, " +
                "(SELECT `Name` FROM `sns-user` WHERE `sns-user`.`ID` = `sns-post`.`UserID`) AS user_name "+
                "FROM `sns-post` ORDER BY ID DESC;"
            );
        }
        else {
            _result = await _connection.Query(" " +
                "SELECT " +
                "`sns-post`.`ID`            AS post_id, " +
                "`sns-post`.`Content`       AS post_content, " +
                "`sns-post`.`Coordinate`    AS post_coordinate, " +
                "`sns-post`.`Address`       AS post_address, " +
                "`sns-post`.`AddressObject` AS post_addressobj, " +
                "`sns-post`.`Date`          AS post_date, " +
                "`sns-post`.`UserID`        AS user_id, " +
                "(SELECT `Name` FROM `sns-user` WHERE `sns-user`.`ID` = `sns-post`.`UserID`) AS user_name "+
                "FROM `sns-post` WHERE `sns-post`.`UserID` = ? ORDER BY post_id DESC;"
            , [ _userid ]);
        };

        //Check result
        _result.forEach(x => {
            x.post_delete = (x.user_id == request.session["game.user"]);
        });

        //Set response
        _response.data = _result;
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
export default List;