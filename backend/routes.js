const app = require("express")();
const cors = require("cors");
const { json } = require("express");
const { verifyUser } = require("./firebase/firebase");
const { setUser, getUser } = require("./firebase/db.js");
const { getAuthURL, getToken } = require("./google/oauth.js");
const { updateUserPlaylists } = require("./google/youtube.js");
const CONFIG = require("./config.js");

app.use(cors());
app.use(json());

app.use(async (req, res, next) => {
	console.log("Got Request!");
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
	try {
		const token = await getToken(code);

		// create the user in db
		const userDB = await getUser(user.user_id);
		userDB.token = token;
		userDB.uid = user.user_id;
		setUser(userDB);

		// send response (use onsnapshot on frontend)
		res.json({ status: "success", message: "OAuth credentials saved." });
		res.end();

		updateUserPlaylists(userDB);
	} catch (err) {
		console.error(err);
		res.json({ status: "fail", message: "Invalid OAuth code." });
		res.end();
	}
});

app.post("/update", async (req, res) => {
	const user = req.body._user;
	try {
		const userDB = await getUser(user.user_id);
		if (!userDB.token) {
			res.json({ status: "fail", message: "Need access to youtube" });
			res.end();
			return;
		}

		res.json({ status: "success", message: "OAuth credentials saved." });
		res.end();

		updateUserPlaylists(userDB);
	} catch (err) {
		console.error(err);
		res.json({ status: "fail", message: "Invalid OAuth code." });
		res.end();
	}
});

module.exports = app;
