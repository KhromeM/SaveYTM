// https://saveytm.s3.amazonaws.com/youtubevideo.mp4
const ytdl = require("ytdl-core");
const AWS = require("aws-sdk");
const S3 = new AWS.S3();
const Bucket = "saveytm";

const func = async (videoID) => {
	uploadFile(ytdl(videoID), "music/youtubevideo2.mp4");
};

const uploadFile = (stream, path) => {
	let params = { Bucket, Key: path, Body: stream };
	S3.upload(params, (err) => {
		if (err) {
			console.log("Error uploading file: " + path);
			console.log(err);
		} else {
			console.log("Uploaded: " + path);
		}
	});
};

// func("cULQhvuq1Zc");
const deleteFile = (path) => {
	let params = { Bucket, Key: path };
	S3.deleteObject(params, (err) => {
		if (err) {
			console.log("Error deleting file: " + path);
			console.log(err);
		} else {
			console.log("Deleted: " + path);
		}
	});
};

const getPresignedDir = async (path) => {
	let params = { Bucket, Key: path, Expires: 60000 };
	try {
		let response = await S3.getSignedUrlPromise("getObject", params);
		return response;
	} catch (err) {
		console.log("Error getting presisgned directory: " + path);
		console.log(err);
	}
};

const downloadPlaylist = (playlist) => {
	// upload the audio fle
	let listOfVideoIds = playlist.videos.map((video) => {
		return video.videoId;
	});
	listOfVideoIds.forEach((videoId) => {
		uploadFile(ytdl(videoId), `music/${videoId}.mp4`);
	});
	// upload the thumbnail
};
const playlist = {
	videos: [
		{ videoId: "NMRhx71bGo4" },
		{ videoId: "H3Kzh6RrnMc" },
		{ videoId: "sTJ7AzBIJoI" },
		{ videoId: "k-3roAbOIw4" },
		{ videoId: "D7DVSZ_poHk" },
		{ videoId: "rSn1M0hVf6E" },
		{ videoId: "2WrOaA7QCM4" },
		{ videoId: "KWuyx6yZ21U" },
		{ videoId: "KT7F15T9VBI" },
		{ videoId: "uPBpmz1Z32w" },
		{ videoId: "C1ZN_NRBWwI" },
	],
};
downloadPlaylist(playlist);
// getPresignedDir("music/youtubevideo.mp4").then((r) => console.log(r));
// deleteFile("youtubevideo.mp4");
