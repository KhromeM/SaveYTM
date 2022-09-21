const { db } = require("./firebase");
const users = db.collection("users");
const playlists = db.collection("playlists");
const deleted = db.collection("deleted");

const setUser = async (data) => {
	const { uid } = data;
	const ref = users.doc(uid);
	await ref.set(data);
};

const getUser = async (uid) => {
	const ref = users.doc(uid);
	const user = await ref.get();
	if (!user.exists) {
		console.error("User does not exist!");
		return {};
	}
	return user.data();
};

const setPlaylist = async (data) => {
	const { playlistId } = data.info;
	const ref = playlists.doc(playlistId);
	await ref.set(data);
};

const getPlaylist = async (playlistObj) => {
	const { playlistId } = playlistObj;
	const ref = playlists.doc(playlistId);
	const playlist = await ref.get();
	if (!playlist.exists) {
		console.error("Playlist does not exist!", playlistObj);
		return {};
	} else {
		return playlist.data();
	}
};

const getDeleted = async (uid) => {
	const ref = deleted.doc(uid);
	const deletedList = await ref.get();
	if (!deletedList.exists) {
		return {};
	} else {
		return deletedList.data();
	}
};

const setDeleted = async (uid, list) => {
	const ref = deleted.doc(uid);
	await ref.set(list);
};