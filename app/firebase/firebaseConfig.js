import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDpGgVmCda9J_1q5IpSp12RczomdRdt6Cs",
  authDomain: "dotorious-5fbf0.firebaseapp.com",
  projectId: "dotorious-5fbf0",
  storageBucket: "dotorious-5fbf0.appspot.com",
  messagingSenderId: "64195311760",
  appId: "1:64195311760:web:6a6da9fac6c5e061eec015",
  measurementId: "G-ELTFEMZDQB"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };