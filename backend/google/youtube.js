const { getClient } = require("./oauth");
const google = require("googleapis").google;
const {
	setUser,
	getUser,
	setPlaylist,
	getPlaylist,
	setDeleted,
	getDeleted,
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

		// diff it //////////////////////////////

		setPlaylist(videos);
	});
};

module.exports = { getPlaylists, getVideos, updateUserPlaylists };

// const user = {
// 	uid: "zduQmbmF2TU8uH8YhMMuJglrsVP2",
// 	token: {
// 		access_token:
// 			"ya29.a0Aa4xrXOIQVLksdXKm5VrL8NR0trKi_W5tpXaBdtg4rMI5or_98g-wpk0940ir0WQNyqE0uGxJRdhwSZ1BG77xZNfra3zSB6uexLjuIhmLR1M6bGSXTKzNRgiOUxw_ouC2LVLBk5Tuq89wj0qiu4GKQShPNBEaCgYKATASARESFQEjDvL9zmZQhqoVvPKqcpJtCSOC4Q0163",
// 		refresh_token:
// 			"1//0dNhEIzxYMpSLCgYIARAAGA0SNwF-L9Ir5R7LxlnU4n3SzfI9j1cdoG3LlXbH1OBs8XqdwmrLaQZNvbf4ai91nccbcBEpJNxr3B0",
// 		scope: "https://www.googleapis.com/auth/youtube.readonly",
// 		token_type: "Bearer",
// 		expiry_date: 1663783840605,
// 	},
// };
// const playlistObj = {
// 	playlistId: "PLJdEWbB6MKlxyw8-i-sgSA93oH_rvGCP3",
// 	PlaylistTitle: "Music 7",
// };

// const func = async () => {
// 	try {
// 		await updateUserPlaylists(user);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
// func();
