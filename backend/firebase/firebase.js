const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("../saveytm-firebase-adminsdk-rzwar-ddd2543d07.json");

const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
const db = app.firestore();
const auth = getAuth(app);

// const idToken = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxZTZjMGM2YjRlMzA5NTI0N2MwNjgwMDAwZTFiNDMxODIzODZkNTAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTXVzdGFmYSBLaHVycmFtIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BRmRadWNxSi1JNVJjS3BfOEZ6RzlKTUl0emZ2RnRRMjlncFJwNkV1dGh1ck9RPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NhdmV5dG0iLCJhdWQiOiJzYXZleXRtIiwiYXV0aF90aW1lIjoxNjYzMTc1MTM2LCJ1c2VyX2lkIjoiemR1UW1ibUYyVFU4dUg4WWhNTXVKZ2xyc1ZQMiIsInN1YiI6InpkdVFtYm1GMlRVOHVIOFloTU11SmdscnNWUDIiLCJpYXQiOjE2NjM3ODc1NDAsImV4cCI6MTY2Mzc5MTE0MCwiZW1haWwiOiJtdXN0YWZha2h1cnJhbTk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAxNjcyNzE2MTk4MjE1MjI4ODk1Il0sImVtYWlsIjpbIm11c3RhZmFraHVycmFtOTVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.plSvaBOQXVZS6ZxpUtrKMR5pGvBKmzRUuOu-RVi_Haq1vaM8VTZfRj5fhoCyTHLuKaX9QzoNbccNc2Aqnh32bW52EaltzlV0dZxHHrztYQRAd2KUfrNNtfahJu3pycHCRF2o7Q5EbQvhJ-pzqR_hZ4QFblXrmz6Ku-jQ50J36xpWU23zNf3e-V7e_hoDUm4NPw7h0B6ldLRTeIFe49jPQJq2JYhhYRabgbUhcxt_ufyRelhU9f40dKX8iiIuoT998uNUWWmNEoWSU454i-8B3dcZa5E8raAdTFwXLdNv-xKJzrsSpL9isJfi7_CkQhPSuzVxzzwr5wdKX1lUoMqgFg`;

const verifyUser = async (idToken) => {
	try {
		return await auth.verifyIdToken(idToken);
	} catch (err) {
		console.error("Invalid idToken");
		return {};
	}
};

module.exports = { app, db, auth, verifyUser };
