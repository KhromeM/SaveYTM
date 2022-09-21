const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("../saveytm-firebase-adminsdk-rzwar-ddd2543d07.json");

const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
const db = app.firestore();
const auth = getAuth(app);

const idToken = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxZTZjMGM2YjRlMzA5NTI0N2MwNjgwMDAwZTFiNDMxODIzODZkNTAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTXVzdGFmYSBLaHVycmFtIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BRmRadWNxSi1JNVJjS3BfOEZ6RzlKTUl0emZ2RnRRMjlncFJwNkV1dGh1ck9RPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NhdmV5dG0iLCJhdWQiOiJzYXZleXRtIiwiYXV0aF90aW1lIjoxNjYzMTc1MTM2LCJ1c2VyX2lkIjoiemR1UW1ibUYyVFU4dUg4WWhNTXVKZ2xyc1ZQMiIsInN1YiI6InpkdVFtYm1GMlRVOHVIOFloTU11SmdscnNWUDIiLCJpYXQiOjE2NjM3OTU1NTksImV4cCI6MTY2Mzc5OTE1OSwiZW1haWwiOiJtdXN0YWZha2h1cnJhbTk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAxNjcyNzE2MTk4MjE1MjI4ODk1Il0sImVtYWlsIjpbIm11c3RhZmFraHVycmFtOTVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.qWJfKHutwi2TzV5r5T3X178YdvUd2_7POlNTIWZ6PokpUWGI3i4927tVDnECjQwftQHa1crStR0gn-n_D4IJ0OCV3x9xdCl8CIki-Nv3GNimSW-Y1rgwpjhZNvzfI1bV4ILUoGrbv9kZyWb8P--sdxBQJvXBnKizwJpg-T9zkgavUxcKltjLo6zAZ6SZ_cF9DjjThMoxd-vXu6uXB2a3z4VcIUdnOnyGNu8lP_FDJfrFpMu5Ep_LHlybakvfbiFPltvmKxgw61rMGgQemaqtXWI3VBf4XgepnTEX2YoVz8MTkoZzO3RpkZzKqZN7R_8u_8fdBGWZyWEjHJhVPLTnBg`;

const verifyUser = async (idToken) => {
	try {
		return await auth.verifyIdToken(idToken);
	} catch {
		return {};
	}
};

// verifyUser(idToken).then((r) => console.log(r));

module.exports = { app, db, auth, verifyUser };
