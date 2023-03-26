import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
	apiKey: "AIzaSyBF5yA4Db8h0Vpu6243pOCP77I7sFBiuaE",
	authDomain: "joblocator-bf5d7.firebaseapp.com",
	projectId: "joblocator-bf5d7",
	storageBucket: "joblocator-bf5d7.appspot.com",
	messagingSenderId: "962628833031",
	appId: "1:962628833031:web:40347a5537f543e7bf3fa2",
	measurementId: "G-WLBKCHND8B",
});
// Firebase storage reference
const storage = getStorage(app);
export const auth = getAuth(app);
export default storage;
