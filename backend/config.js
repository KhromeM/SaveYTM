const baseURL = "https://www.saveytm.com";
// const baseURL = "http://localhost:3000";
module.exports = {
	port: process.env.PORT || 8080,
	baseURL: baseURL,
	oauth2Credentials: {
		client_id:
			"327854949305-7qaj8nr932lthorggipdod8hsrs4s2tk.apps.googleusercontent.com",
		client_secret: "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",
		project_id: "saveytm1",
		scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
		redirect_uri: `${baseURL}/auth/google/callback`,
	},
};
