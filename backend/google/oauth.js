const google = require("googleapis").google;
const { OAuth2Client } = require("google-auth-library");
const CONFIG = require("../config.js");

const OAuth2 = google.auth.OAuth2;

const getClient = () => {
	const client = new OAuth2(
		CONFIG.oauth2Credentials.client_id,
		CONFIG.oauth2Credentials.client_secret,
		CONFIG.oauth2Credentials.redirect_uri
	);
	return client;
};

const getAuthURL = () => {
	const client = getClient();
	const url = client.generateAuthUrl({
		access_type: "offline",
		prompt: "consent", // always get refresh token
		scope: CONFIG.oauth2Credentials.scopes,
	});
	return url;
};

const getToken = (code) => {
	const client = getClient();

	return new Promise((resolve, reject) => {
		client.getToken(code, (err, token) => {
			if (err) {
				reject("ERROR: Invalid oauth code.");
			} else {
				resolve(token);
			}
		});
	});
};

module.exports = { getClient, getAuthURL, getToken };
