import { createServer } from "node:http";

const server = createServer((request, response) => {
    console.log("Request received");

    response.statusCode = 200;

    response.setHeader("Content-Type", "application/json"); 
    response.setHeader("Location", "Mars");

    const responseBody = JSON.stringify({ message: "Server running on Mars" }); 

    response.end(responseBody);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
