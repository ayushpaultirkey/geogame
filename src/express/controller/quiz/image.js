import MySQL from "../../../config/mysql.js";

/**
    * 
    * @param {import("express").Request} request 
    * @param {import("express").Response} response 
*/
async function Image(request, response) {

    //Create response
    const _response = { message: "", success: false, data: [], redirect: "" };

    //Try and catch error
    try {

        //Get query parameters
        const _quizid = request.query.quizid;

        //Check for initial user id
        if(typeof(_quizid) == "undefined" || _quizid == null) {
            throw "No quiz found";
        };

        //Create new mysql connection
        const _connection = new MySQL.Connection();

        //Connect to database
        await _connection.Connect();

        //Run query
        const _result = await _connection.Query(
            "SELECT "+
            "`ID`           AS img_id, " +
            "`QuizID`       AS img_quizid, " +
            "`Link`         AS img_link " +
            "FROM `sns-image` WHERE `QuizID` = ?;", [ _quizid ]
        );
        
        //Check for data
        if(_result.length > 0) {
            _response.data = _result;
        }
        else {
            _response.message = "No image found";
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
export default Image;