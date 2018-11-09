const {AuthAPIClient, DataAPIClient} = require("truelayer-client");
const app = require("express")();

const redirect_uri = "http://localhost:5000/truelayer-redirect";

// Create TrueLayer client instance
const client = new AuthAPIClient({
    client_id: "INSERT YOUR client_id HERE",
    client_secret: "INSERT YOUR client_secret HERE"
});

// Define array of permission scopes
const scopes = ["info", "accounts", "balance", "transactions", "offline_access", "cards"]

// Construct url and redirect to the auth dialog
app.get("/", (req, res) => {
    const authURL = client.getAuthUrl(redirect_uri, scopes, "foobar");
    res.redirect(authURL);
});

// Retrieve 'code' query-string param, exchange it for access token and hit data api
app.get("/truelayer-redirect", async (req, res) => {
    const code = req.query.code;
    const tokens = await client.exchangeCodeForToken(redirect_uri, code);
    const info = await DataAPIClient.getInfo(tokens.access_token);

    res.set("Content-Type", "text/plain");
    res.send(`Access Token: ${JSON.stringify(info, null, 2)}`);
});

app.listen(5000, () => console.log("Example app listening on port 5000..."));


// import express from 'express'
// import User from './User';
// import { AuthAPIClient, DataAPIClient } from "truelayer-client";

// let app = express();

// const redirect_uri = "http://localhost:5000/truelayer-redirect";


// let Router = express.Router();
// let user = new User('testUser');
// user.ping();

// let Client = new AuthAPIClient({
//     client_id: ''
// })

// console.log('Done!');






// // Create TrueLayer client instance
// const client = new AuthAPIClient({
//     client_id: "INSERT YOUR client_id HERE",
//     client_secret: "INSERT YOUR client_secret HERE"
// });

// // Define array of permission scopes
// const scopes = ["info", "accounts", "balance", "transactions", "offline_access", "cards"]

// // Construct url and redirect to the auth dialog
// app.get("/", (req, res) => {
//     const authURL = client.getAuthUrl(redirect_uri, scopes, "foobar");
//     res.redirect(authURL);
// });

// // Retrieve 'code' query-string param, exchange it for access token and hit data api
// app.get("/truelayer-redirect", async (req, res) => {
//     const code = req.query.code;
//     const tokens = await client.exchangeCodeForToken(redirect_uri, code);
//     const info = await DataAPIClient.getInfo(tokens.access_token);

//     res.set("Content-Type", "text/plain");
//     res.send(`Access Token: ${JSON.stringify(info, null, 2)}`);
// });

// app.listen(5000, () => console.log("Example app listening on port 5000..."));