import url from "url";
import http from "http";
import path from "path";
import fs from "fs/promises";
import express from "express";
import session from "express-session";
import viteexpress from "vite-express";
import cookieparser from "cookie-parser";
import cookieencrypter from "cookie-encrypter";
import router from "./router.js";
import compression from "compression";
import "dotenv/config";

//
function init() {

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
    
    //Serve files
    app.use("/", router);
    
    //Create server
    viteexpress.listen(app, 3000, () => console.log("Server is listening..."));

};

//
export default init;