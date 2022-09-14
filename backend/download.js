const ytdl = require("ytdl-core");

const func = async (videoID) => {
	let info = await ytdl.getInfo(videoID);
	let audioFormats = ytdl.filterFormats(info.formats, "audioonly");
	console.log(audioFormats);
};

func("cULQhvuq1Zc");
