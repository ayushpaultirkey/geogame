import MySQL from "../../../config/mysql.js";

/**
    * 
    * @param {import("express").Request} request 
    * @param {import("express").Response} response 
*/
async function Signup(request, response) {

    //Create response
    const _response = { message: "", success: false, data: [] };

    //Try and catch error
    try {

        //Get query parameters
        const _name = request.query.name;
        const _username = request.query.username;
        const _password = request.query.password;

        //Check for data
        if(typeof(_name) == "undefined" || typeof(_username) == "undefined" || typeof(_password) == "undefined" || _name.length < 2 || _username.length < 2 || _password.length < 2) {
            throw "Please enter name, username and password";
        };

        //Create new mysql connection
        const _connection = new MySQL.Connection();

        //Connect to database
        await _connection.Connect();

        //Run query
        const _result = await _connection.Query("INSERT INTO `sns-user` (Name, Username, Password) SELECT * FROM (SELECT ? AS t_name, ? AS t_username, ? AS t_password) AS tmp WHERE NOT EXISTS ( SELECT Username FROM `sns-user` WHERE Username = ? ) LIMIT 1;", [ _name, _username, _password, _username ]);

        //Check for result
        if(_result.insertId == 0) {
            _response.message = "Username already exists";
        }
        else {

            //Set data
            _response.data = { user_id: _result.insertId };
            _response.success = true;

            //Create session and cookie
            request.session["game.user"] = _result.insertId;
            response.cookie("game.user", _result.insertId, { maxAge: 900000, httpOnly: true, signed: true });
        
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
export default Signup;