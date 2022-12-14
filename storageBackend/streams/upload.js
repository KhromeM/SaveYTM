// https://saveytm.s3.amazonaws.com/youtubevideo.mp4

const AWS = require("aws-sdk");

const { getReadStream } = require("./download.js");

const Bucket = "saveytm";
AWS.config.update({
	accessKeyId: process.env.ACCESSKEYID,
	secretAccessKey: process.env.SECRETACCESSKEY,
	region: "us-east-1",
});

const S3 = new AWS.S3();

const uploadVideo = async (uid, videoId) => {
	let stream, fileName;
	try {
		let streamObj = await getReadStream(videoId);
		stream = streamObj.stream;
		fileName = streamObj.fileName;
	} catch (e) {
		// console.log(e);
		// console.log("Error uploading: " + videoId);
		stream = null;
	}
	if (stream === null) {
		return new Promise((resolve) =>
			resolve({ videoId, result: false, error: "Not available" })
		);
	}

	const path = uid + "/" + fileName;
	let params = { Bucket, Key: path, Body: stream };
	return new Promise((resolve) => {
		S3.upload(params, (err) => {
			if (err) {
				console.log({ videoId, result: false, error: err });
				resolve({ videoId, result: false, error: err });
			} else {
				console.log({ videoId, result: true });
				resolve({ videoId, result: true });
			}
		});
	});
};

const uploadPlaylist = (uid, playlist) => {
	let promises = playlist.videos.map((video) =>
		uploadVideo(uid, video.videoId)
	);
	return Promise.all(promises);
};

module.exports = { uploadPlaylist, uploadVideo };
// const deleteFile = (path) => {
// 	let params = { Bucket, Key: path };
// 	S3.deleteObject(params, (err) => {
// 		if (err) {
// 			console.log("Error deleting file: " + path);
// 			console.log(err);
// 		} else {
// 			console.log("Deleted: " + path);
// 		}
// 	});
// };

// const getPresignedDir = async (path) => {
// 	let params = { Bucket, Key: path, Expires: 60000 };
// 	try {
// 		let response = await S3.getSignedUrlPromise("getObject", params);
// 		return response;
// 	} catch (err) {
// 		console.log("Error getting presisgned directory: " + path);
// 		console.log(err);
// 	}
// };

// // const downloadPlaylist = (playlist) => {
// // 	// upload the audio fle
// // 	let listOfVideoIds = playlist.videos.map((video) => {
// // 		return video.videoId;
// // 	});
// // 	listOfVideoIds.forEach((videoId) => {
// // 		uploadFile(ytdl(videoId), `music/${videoId}.mp4`);
// // 	});
// // 	// upload the thumbnail
// // };

// const playlist = {
// 	videos: [
// 		{ videoId: "NMRhx71bGo4" },
// 		{ videoId: "H3Kzh6RrnMc" },
// 		{ videoId: "sTJ7AzBIJoI" },
// 		{ videoId: "k-3roAbOIw4" },
// 		{ videoId: "D7DVSZ_poHk" },
// 		{ videoId: "rSn1M0hVf6E" },
// 		{ videoId: "2WrOaA7QCM4" },
// 		{ videoId: "KWuyx6yZ21U" },
// 		{ videoId: "KT7F15T9VBI" },
// 		{ videoId: "uPBpmz1Z32w" },
// 		{ videoId: "C1ZN_NRBWwI" },
// 	],
// 	info: { playlistId: "", playlistTitle: "", thumbnail: { url: "" } },
// };
// downloadPlaylist(playlist);
// getPresignedDir("music/youtubevideo.mp4").then((r) => console.log(r));
// deleteFile("youtubevideo.mp4");
