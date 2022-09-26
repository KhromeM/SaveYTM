require("dotenv").config();

const app = require("./routes.js");
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
	console.log("Server is listening to port: " + PORT);
});
