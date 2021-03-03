const host = 'localhost';
const port = 8000;

const http = require("http");
const fs = require('fs').promises;
var url = require('url'); 

const requestListener = function (req, res) {
    var path = url.parse(req.url).pathname;
    console.log(path);
    switch (path) {  
        case '/':  
            fs.readFile(__dirname + "/index.html")
                .then(contents => {
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
            break;
        case '/pagina2.html':  
            fs.readFile(__dirname + path)
                .then(contents => {
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
            break;
        default:  
            res.writeHead(404);  
            res.write("bestand niet gevonden - 404");  
            res.end();  
            break;  
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});