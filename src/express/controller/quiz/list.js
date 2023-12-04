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

        //Get query parameters
        const _address = (typeof(request.query.address) !== "undefined") ? request.query.address : null;

        //Create new mysql connection
        const _connection = new MySQL.Connection();

        //Connect to database
        await _connection.Connect();

        //Run query
        let _result = null;
        if(_address == null) {
            _result = await _connection.Query(
                "SELECT "+
                "`ID`           AS quiz_id, " +
                "`Title`        AS quiz_title, " +
                "`Description`  AS quiz_detail, " +
                "`Hint`         AS quiz_hint, " +
                "`Coordinate`   AS quiz_coordinate, " +
                "`Address`      AS quiz_address, " +
                "`Thumbnail`    AS quiz_thumb " +
                "FROM `sns-quiz`;"
            );
        }
        else {
            _result = await _connection.Query(
                "SELECT "+
                "`ID`           AS quiz_id, " +
                "`Title`        AS quiz_title, " +
                "`Description`  AS quiz_detail, " +
                "`Hint`         AS quiz_hint, " +
                "`Coordinate`   AS quiz_coordinate, " +
                "`Address`      AS quiz_address, " +
                "`Thumbnail`    AS quiz_thumb " +
                "FROM `sns-quiz` WHERE `Address` = ?;", [ _address ]
            );
        };
        
        //Check for data
        if(_result.length > 0) {
            _response.data = _result
        }
        else {
            _response.message = "No quiz found";
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
export default List;