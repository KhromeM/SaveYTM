const app = require("express")();
const CONFIG = require("./config");

app.listen(CONFIG.port, () => {
	console.log("Server is listening to port: " + CONFIG.port);
});
