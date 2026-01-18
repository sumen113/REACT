import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL3xcXLG1XS_YAhTWU935Q9HMX0SOFmUg",
  authDomain: "sumencounter.firebaseapp.com",
  projectId: "sumencounter",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);