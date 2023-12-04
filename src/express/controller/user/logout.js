/**
    * 
    * @param {import("express").Request} request 
    * @param {import("express").Response} response 
*/
async function Logout(request, response) {
    
    //Create response
    const _response = { message: "", success: false, redirect: "" };
    
    //Try and catch error
    try {

        //Remove cookie and session
        response.clearCookie("game.user");
        request.session.destroy();

        //Set response
        _response.redirect = "#login";

    }
    catch(ex) {
        _response.message = ex;
    };

    //Send response
    response.send(_response);

};

//
export default Logout;