/* Minimal SSL/non-SSL example */

const uWS = require("uWebSockets.js");
const port = 9001;

uWS.App({
    key_file_name: "misc/key.pem",
    cert_file_name: "misc/cert.pem",
    passphrase: "1234"
})
    .ws("/*", {
        /* Options */
        compression: 0,
        maxPayloadLength: 16 * 1024 * 1024,
        idleTimeout: 10,
        /* Handlers */
        open: (ws, req) => {
            console.log("A WebSocket connected via URL: " + req.getUrl() + "!");
        },
        message: (ws, message, isBinary) => {
            /* Ok is false if backpressure was built up, wait for drain */
            ws.send(message, isBinary);
            console.log(ab2str(message));
        },
        drain: ws => {
            console.log("WebSocket backpressure: " + ws.getBufferedAmount());
        },
        close: (ws, code, message) => {
            console.log("WebSocket closed");
        }
    })
    .any("/*", (res, req) => {
        res.end("Nothing to see here!");
    })
    .listen(port, token => {
        if (token) {
            console.log("Listening to port " + port);
        } else {
            console.log("Failed to listen to port " + port);
        }
    });

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}
