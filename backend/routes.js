const app = require("express")();
const { json } = require("express");
const cookieparser = require("cookie-parser");
const { verifyUser } = require("./firebase/firebase");
const { getAuthURL, getToken } = require("./google/oauth");
const CONFIG = require("./config");

app.use(json());
app.use(cookieparser());

app.use(async (req, res, next) => {
	req.body._user = await verifyUser(req.body.idToken);

	if (!req.body._user.uid) {
		res.json({ status: "fail", message: "Invalid User. Please log in." });
		return res.end();
	}
	next();
});

app.post("/getoauthlink", (req, res) => {
	res.json({ authURL: getAuthURL() });
	res.end();
});

app.post("/giveoauth", async (req, res) => {
	const user = req.body._user;
	const code = req.body.code;
	let message = {};
	try {
		const token = await getToken(code);
		message = { status: "success", message: "OAuth credentials saved." };
		// save user
	} catch (err) {
		console.error(err);
		message = { status: "fail", message: "Invalid OAuth code." };
	}
	res.json(message);
	res.end();
});

app.post("/getplaylists", (req, res) => {
	const user = req.body._user;
	// req.body = { uid: 'uid', AuthToken: 'token'}
	// check if the user token sent with the request is valid
	// respond with all the playlists for that user
	res.json(req.originalUrl);
});

app.post("/getdeleted", (req, res) => {
	const user = req.body._user;
	// req.body = { uid: 'uid', AuthToken: 'token'}
	// check if the user token sent with the request is valid
	// respond with a playlist of deleted videos from that user's playlists
	res.json(req.originalUrl);
});

app.post("/search", (req, res) => {
	const user = req.body._user;
	// req.body = { uid: 'uid', AuthToken: 'token', searchTerm: 'search term'}
	// check if the user token sent with the request is valid
	// use youtube api to search
	// format results
	// send results in response
	res.json(req.originalUrl);
});

module.exports = app;
