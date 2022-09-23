const ytdl = require("ytdl-core");
const AWS = require("aws-sdk");
const S3 = new AWS.S3();
const stream = require("stream");
const { fstat } = require("fs");

const func = async (videoID) => {
	upload(ytdl(videoID), "youtubevideo.mp4");
};

const upload = (stream, name) => {
	// let pass = new stream.PassThrough();

	let params = { Bucket: "saveytm", Key: name, Body: stream };
	S3.upload(params, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});
};

// func("cULQhvuq1Zc");
// https://saveytm.s3.amazonaws.com/youtubevideo.mp4
const download = () => {};
