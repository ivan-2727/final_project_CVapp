import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7fr8fbq-eUKN9k_JaLpldMrBs3PfbMT4",
  authDomain: "resumate-15231.firebaseapp.com",
  projectId: "resumate-15231",
  storageBucket: "resumate-15231.appspot.com",
  messagingSenderId: "685131094898",
  appId: "1:685131094898:web:524f8f035810d52023dbeb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);