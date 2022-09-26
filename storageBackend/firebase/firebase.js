const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("../saveytm-firebase-adminsdk-rzwar-ddd2543d07.json");

const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
const db = app.firestore();
const auth = getAuth(app);

const verifyUser = async (idToken) => {
	try {
		return await auth.verifyIdToken(idToken);
	} catch {
		return {};
	}
};

module.exports = { app, db, auth, verifyUser };
