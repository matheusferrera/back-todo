// firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtU1TsV2Vbi3xWgrn5jj_2ZoCxc9b-3mU",
  authDomain: "projetoteste-c1ac3.firebaseapp.com",
  databaseURL: "https://projetoteste-c1ac3-default-rtdb.firebaseio.com",
  projectId: "projetoteste-c1ac3",
  storageBucket: "projetoteste-c1ac3.appspot.com",
  messagingSenderId: "405909393945",
  appId: "1:405909393945:web:0787a41afc74c8effad088",
  measurementId: "G-8DXZTNYR4N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
