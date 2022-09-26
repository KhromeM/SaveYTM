const { db } = require("./firebase");
const users = db.collection("users");
const playlists = db.collection("playlists");
const videos = db.collection("videos");

const setUser = async (data) => {
	const { uid } = data;
	const ref = users.doc(uid);
	return await ref.set(data);
};

const getUser = async (uid) => {
	const ref = users.doc(uid);
	const user = await ref.get();
	if (!user.exists) {
		return {};
	}
	return user.data();
};

const setPlaylist = async (data) => {
	const { playlistId } = data.info;
	const ref = playlists.doc(playlistId);
	return await ref.set(data);
};

const getPlaylist = async (playlistObj) => {
	const { playlistId } = playlistObj;
	const ref = playlists.doc(playlistId);
	const playlist = await ref.get();
	if (!playlist.exists) {
		return {};
	} else {
		return playlist.data();
	}
};

const setUserVideos = async (user, userVideos) => {
	const ref = videos.doc(user.uid);
	return await ref.set({ videos: userVideos });
};

module.exports = {
	setUser,
	getUser,
	setPlaylist,
	getPlaylist,
	setUserVideos,
};
