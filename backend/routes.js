const app = require("express")();
const CONFIG = require("./config");

// GET Routes
app.get("/getoauthlink", (req, res) => {
	// generate a oauth link
	// send over that link
	res.json(req.originalUrl);
});

// POST Routes

app.post("/getplaylists", (req, res) => {
	// req.body = { uid: 'uid', AuthToken: 'token'}
	// check if the user token sent with the request is valid
	// respond with all the playlists for that user
	res.json(req.originalUrl);
});

app.post("/getdeleted", (req, res) => {
	// req.body = { uid: 'uid', AuthToken: 'token'}
	// check if the user token sent with the request is valid
	// respond with a playlist of deleted videos from that user's playlists
	res.json(req.originalUrl);
});

app.post("/giveoauth", (req, res) => {
	// req.body = {code: 'code', uid: 'uid', AuthToken: 'token'}
	// check if oauth code is valid
	// save the oauth token to db with the corresponding uid
	res.json(req.originalUrl);
});

app.post("/search", (req, res) => {
	// req.body = { uid: 'uid', AuthToken: 'token', searchTerm: 'search term'}
	// check if the user token sent with the request is valid
	// use youtube api to search
	// format results
	// send results in response
	res.json(req.originalUrl);
});

module.exports = app;
