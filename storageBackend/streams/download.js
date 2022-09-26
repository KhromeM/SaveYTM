const https = require("https");
const ytdl = require("ytdl-core");

const getReadStream = async (id) => {
	let info = await ytdl.getInfo(id);
	let audioFormats = ytdl.filterFormats(info.formats, "audioonly");

	let audioBitrate = 0;
	let url = "";
	let container = "";
	let itag = null;

	audioFormats.forEach((format) => {
		if (format.audioBitrate > audioBitrate) {
			audioBitrate = format.audioBitrate;
			url = format.url;
			container = format.container;
			itag = format.itag;
		}
	});
	let fileName = `${id}.${container}`;

	if (itag === null) {
		{
			stream: null, fileName;
		}
	}
	let stream = ytdl(id, { quality: itag });
	const limit = 5 * 60 * 1000; // 5 mins
	setTimeout(() => {
		stream.emit("error", "timeout");
	}, limit);
	return { stream, fileName };
};

const getPromiseFromStream = () => {};

module.exports = { getReadStream };
