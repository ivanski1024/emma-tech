const { AuthAPIClient, DataAPIClient } = require("truelayer-client");
import Express from 'express';
import crypto from 'crypto';

const app = Express();
const redirect_uri = "http://localhost:5000/truelayer-redirect";

const client = new AuthAPIClient({
    client_id: "emmatech-owm9",
    client_secret: "210aavljqh9em9rh77g49v"
});

const scopes = ["info", "accounts", "balance", "transactions", "offline_access", "cards"]



app.get("/", (req, res) => {
    let nonce = crypto.randomBytes(12);
    const authURL = client.getAuthUrl(redirect_uri, scopes, nonce, null, null, true);
    console.log(authURL)
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