
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
//jon.rodriguez@deped.gov.ph
const firebaseConfig = {
  apiKey: "AIzaSyC_tH2nYQBrs664cLivi12Pm453Z70pT3o",
  authDomain: "marketplace-39e0e.firebaseapp.com",
  projectId: "marketplace-39e0e",
  storageBucket: "marketplace-39e0e.appspot.com",
  messagingSenderId: "456155705224",
  appId: "1:456155705224:web:6b1312db2e72813d7c943d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)