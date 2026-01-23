import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const chatFirebaseConfig = {
  apiKey: "AIzaSyDOy-LyrUTfKpnGEvSzpsbUih5DD521wCg",
  authDomain: "chat-e7873.firebaseapp.com",
  databaseURL: "https://chat-e7873-default-rtdb.firebaseio.com",
  projectId: "chat-e7873",
  storageBucket: "chat-e7873.firebasestorage.app",
  messagingSenderId: "444956547835",
  appId: "1:444956547835:web:110ec7ce9bdb247051ee5e",
};

const CHAT_APP_NAME = "chat-app";

const chatApp = getApps().some(app => app.name === CHAT_APP_NAME)
  ? getApp(CHAT_APP_NAME)
  : initializeApp(chatFirebaseConfig, CHAT_APP_NAME);

export const chatDb = getDatabase(chatApp);
