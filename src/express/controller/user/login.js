import MySQL from "../../../config/mysql.js";

/**
    * 
    * @param {import("express").Request} request 
    * @param {import("express").Response} response 
*/
async function Login(request, response) {

    //Create response
    const _response = { message: "", success: false, data: [] };

    //Try and catch error
    try {

        //Get query parameters
        const _username = request.query.username;
        const _password = request.query.password;

        //Check for data
        if(typeof(_username) == "undefined" || typeof(_password) == "undefined" || _username.length < 2 || _password.length < 2) {
            throw "Please enter username and password";
        };

        //Create new mysql connection
        const _connection = new MySQL.Connection();

        //Connect to database
        await _connection.Connect();

        //Run query
        const _result = await _connection.Query("SELECT `ID` as user_id FROM `sns-user` WHERE `Username` = ? AND `Password` = ?;", [ _username, _password ]);

        //Check for result
        if(_result.length > 0) {
            
            //Set data
            _response.data = _result;
            _response.success = true;

            //Create session and cookie
            request.session["game.user"] = _result[0].user_id;
            response.cookie("game.user", _result[0].user_id, { maxAge: 900000, httpOnly: true, signed: true });

        }
        else {
            _response.message = "Wrong username or password";
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
export default Login;