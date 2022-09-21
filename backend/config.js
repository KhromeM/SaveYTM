module.exports = {
	port: process.env.PORT || 3003,
	baseURL: process.env.baseURL || "http://localhost:3000",
	oauth2Credentials: {
		client_id:
			"327854949305-7qaj8nr932lthorggipdod8hsrs4s2tk.apps.googleusercontent.com",
		client_secret: "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",
		project_id: "saveytm1",
		scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
		redirect_uris: [`${baseURL}/auth/google/callback`],
	},
};
