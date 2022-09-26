const ytdl = require("ytdl-core");
const id = "Vi2XaiKhgiU";
const fs = require("fs");

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
	if (itag === null) {
		return null;
	}

	ytdl(id, { quality: itag }).pipe(fs.createWriteStream(`${id}.${container}`));

	// ytdl.chooseFormat(info.formats, { quality: itag })
};

// getReadStream(id);
