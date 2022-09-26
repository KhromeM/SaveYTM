const app = require("express")();
const cors = require("cors");
const { json } = require("express");
const { verifyUser } = require("./firebase/firebase");
const { uploadPlaylist, uploadVideo } = require("./streams/upload.js");
app.use(cors());
app.use(json({ limit: "10MB" }));

app.use(async (req, res, next) => {
	console.log("Got Request!");
	req.body._user = await verifyUser(req.body.idToken);

	if (!req.body._user.uid) {
		res.json({ status: "fail", message: "Invalid User. Please log in." });
		return res.end();
	}
	next();
});

app.post("/upload", async (req, res) => {
	const user = req.body._user;
	const playlist = req.body.playlist;
	try {
		//verify playlist
		console.log(playlist.videos.length);
		const results = await uploadPlaylist(user.uid, playlist);
		console.log(results);
		console.log("Still Alive");
		res.json({ status: "success", message: "Playlist archived" });
		res.end();
	} catch (err) {
		console.error(err);
		res.json({ status: "fail", message: "Something went wrong" });
		res.end();
	}
});

module.exports = app;
