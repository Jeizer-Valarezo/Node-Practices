import { createServer } from "node:http";

const server = createServer((request, response) => {
    console.log("Request received");

    response.statusCode= 200;

    response.setHeader("Content-type", "text/html");

    response.end("<html><body><h1>Este server esta ejecutandose con Node</h1></body></html>")
});

server.listen(3000, () => {
    console.log("Server ejecutandose en http://localhost:3000")
})