const { AuthAPIClient, DataAPIClient } = require("truelayer-client");
import Express from 'express';
import crypto from 'crypto';
import mysql from 'mysql';
import config from 'config';

const app = Express();

const dbConfig = config.get('dbConfig');
const trueLayerConfig = config.get('trueLayerConfig');

const client = new AuthAPIClient(trueLayerConfig.client);
let db = mysql.createConnection(dbConfig);

app.get("/", (req, res) => {
    let nonce = crypto.randomBytes(12);
    const authURL = client.getAuthUrl(trueLayerConfig.redirect_uri, trueLayerConfig.scopes, nonce, null, null, true);
    console.log(authURL)
    res.redirect(authURL);
});

app.get("/truelayer-redirect", async (req, res) => {
    const code = req.query.code;
    const tokens = await client.exchangeCodeForToken(trueLayerConfig.redirect_uri, code);
    const info = await DataAPIClient.getInfo(tokens.access_token);

    res.set("Content-Type", "text/plain");
    res.send(`Access Token: ${JSON.stringify(info, null, 2)}`);
});

app.get("/transactions", (req, res) => {
    let userId = req.param.userId;
})

app.listen(5000, () => console.log("Example app listening on port 5000..."));