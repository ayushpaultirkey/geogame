import url from "url";
import http from "http";
import path from "path";
import fs from "fs/promises";
import express from "express";
import session from "express-session";
import cookieparser from "cookie-parser";
import cookieencrypter from "cookie-encrypter";
import router from "./router.js";
import compression from "compression";
import "dotenv/config";

import Serve from "../../plugin/express.middleware.js";

//
function init() {

    //Get current directory
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    //Create express app
    const app = express();
    const server = http.createServer(app);

    //Create session
    const secret = "app-secret-key-07032001-04112001";
    app.use(cookieparser(secret));
    app.use(cookieencrypter(secret));
    app.use(session({ secret: secret, saveUninitialized: true, resave: false, cookie: { maxAge: 6000000 } }));

    //Use response compression
    app.use(compression());
    
    //Check if the environment variable is present
    if(!process.env.DATABASE_URL) {
        app.use(function(request, response, next) {
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            response.setHeader("Access-Control-Allow-Credentials", true);
            next();
        });
    };
    
    //Serve files
    app.use("/", router);
    /*app.use("/public", Serve(path.join(__dirname, "./../../public")).Express);*/
    /*
    app.use("/public", express.static(path.join(__dirname, "./../../dist/")));
    app.use("/game", function(request, response) {
        response.sendFile(path.join(__dirname, "./../../dist/index.html"))
    });
    */
    
    //Create server
    server.listen(process.env.PORT || 3000, () => {
        console.log("http://localhost:3000/stardust");
    });

};

//
export default init;