const { readFile } = require("../utils");

function staticFileHandler(req, res) {
    if (req.url.endsWith(".css")) {
        sendFile(req.url, res, "text/css");    //handle stylesheets
        return true;
    } else if (req.url.endsWith(".svg")) { 
        sendFile(req.url, res, "image/svg+xml");   //handle favicon
        return true;
    }
    return false;
}

async function sendFile(path, res, contentType) {
    const data = await readFile(path);
    res.writeHead(200, ["Content-Type", contentType]);
    data.pipe(res);
}

module.exports = {
    staticFileHandler,
};
