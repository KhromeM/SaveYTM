const app = require("./routes.js");
const CONFIG = require("./config.js");

app.listen(CONFIG.port, () => {
	console.log("Server is listening to port: " + CONFIG.port);
});
