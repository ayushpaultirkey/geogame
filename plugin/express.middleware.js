import fs from "fs";
import path from "path";
import mime from "mime";
import Transform from "./transform.js";

//
function Serve(_path = "", _config = { packed: false, hotreload: true }) {
    return {
        Express: function(_req, _res) {
            __express(_req, _res, _path, _config);
        }
    };
};

//
const __express = (request, response, _path, _config = { packed: false, hotreload: false }) => {

    //Get url and remove /@ from baseurl and check if url is file
    const _url = path.join(_path, request.url);
    const _extension = path.extname(_url);
    const _exist = fs.existsSync(_url);

    if(_exist && _extension.length > 0) {

        //
        let _data = fs.readFileSync(_url);

        //
        if(_extension.toLowerCase() == ".js") {

            _data = _data.toString();

            if(_data.indexOf("@Component") !== -1) {
                _data = Transform(_data);
            };

        };

        //
        const _content_type = mime.getType(_url);
        response.contentType((_content_type == null) ? "text/plain" : _content_type);
        response.send(_data);

    }
    else {
        response.sendStatus(404);
    };

};

export default Serve;