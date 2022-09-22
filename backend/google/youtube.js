const { getClient } = require("./oauth");
const google = require("googleapis").google;
const {
	setUser,
	getUser,
	setPlaylist,
	getPlaylist,
} = require("../firebase/db.js");

const getVideosHelper = (client, playlistId, pageToken) => {
	const obj = {
		auth: client,
		part: "snippet",
		maxResults: 50,
		playlistId,
	};
	const service = google.youtube("v3");
	if (pageToken) {
		obj.pageToken = pageToken;
	}
	return new Promise((resolve, reject) => {
		service.playlistItems
			.list(obj)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
};
const trimVideoInfo = (data, playlistObj) => {
	const { playlistId, playlistTitle } = playlistObj;

	const processed = { videos: [], info: playlistObj };

	for (const i of data) {
		let thumbnail = i.snippet.thumbnails.maxres ||
			i.snippet.thumbnails.standard ||
			i.snippet.thumbnails.high ||
			i.snippet.thumbnails.medium ||
			i.snippet.thumbnails.default || { url: "null" };

		processed.videos.push({
			title: i.snippet.title,
			videoId: i.snippet.resourceId.videoId,
			channel: i.snippet.videoOwnerChannelTitle || "Deleted",
			thumbnail: thumbnail.url,
		});
	}
	return processed;
};
const getVideos = (user, playlistObj) => {
	const { playlistId } = playlistObj;
	const client = getClient();
	client.credentials = user.token;
	let playlistVideos = [];
	let pageToken = null;
	return new Promise(async (resolve) => {
		while (true) {
			const batch = await getVideosHelper(client, playlistId, pageToken);
			playlistVideos = playlistVideos.concat(batch.items);
			pageToken = batch.nextPageToken;
			if (!pageToken) break;
		}
		resolve(trimVideoInfo(playlistVideos, playlistObj));
	});
};

const getPlaylistsHelper = (client, pageToken) => {
	const obj = {
		auth: client,
		part: "snippet",
		maxResults: 50,
		mine: true,
	};
	const service = google.youtube("v3");
	if (pageToken) {
		obj.pageToken = pageToken;
	}
	return new Promise((resolve, reject) => {
		service.playlists
			.list(obj)
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
};
const trimPlaylistInfo = (data) => {
	const playlists = [];

	for (const i of data) {
		let thumbnail = i.snippet.thumbnails.maxres ||
			i.snippet.thumbnails.standard ||
			i.snippet.thumbnails.high ||
			i.snippet.thumbnails.medium ||
			i.snippet.thumbnails.default || { url: "null" };

		playlists.push({
			playlistTitle: i.snippet.title,
			thumbnail,
			playlistId: i.id,
			publishedAt: i.snippet.publishedAt,
			description: i.snippet.description,
		});
	}
	return playlists;
};

const getPlaylists = (user) => {
	const client = getClient();
	client.credentials = user.token;
	let playlists = [];
	let pageToken = null;
	return new Promise(async (resolve) => {
		while (true) {
			const batch = await getPlaylistsHelper(client, pageToken);
			playlists = playlists.concat(batch.items);
			pageToken = batch.nextPageToken;
			if (!pageToken) break;
		}
		resolve(trimPlaylistInfo(playlists));
	});
};

const updateUserPlaylists = async (user) => {
	// get all the users playlists
	const playlists = await getPlaylists(user);
	user.playlists = playlists;
	setUser(user);

	// get all the videos in the playlist
	playlists.forEach(async (playlistObj) => {
		const videos = await getVideos(user, playlistObj);
		const diffed = await diff(videos);
		setPlaylist(diffed);
	});
};

const diff = async (playlist) => {
	// remove the deleted and private videos
	playlist.videos = playlist.videos.filter((video) => {
		return video.title !== "Private video" && video.title !== "Deleted video";
	});

	// get playlist from DB so we can compare
	const playlistDB = await getPlaylist(playlist.info);
	playlistDB.info = playlist.info;
	playlistDB.videos = playlistDB.videos || [];

	// mark deleted videos
	const set = new Set();
	playlist.videos.forEach((vid) => set.add(vid.videoId));

	playlistDB.videos.forEach((vid) => {
		if (!set.has(vid.videoId)) {
			vid.deleted = true;
		}
	});

	// add new videos
	const dbSet = new Set();
	playlistDB.videos.forEach((vid) => dbSet.add(vid.videoId));

	playlist.videos.forEach((vid) => {
		if (!dbSet.has(vid.videoId)) {
			playlistDB.videos.push(vid);
		}
	});

	return playlistDB;
};

module.exports = { getPlaylists, getVideos, updateUserPlaylists };
