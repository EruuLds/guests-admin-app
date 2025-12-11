import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDrGGl8qjWP4qrik8hIQvOpLYfww-iQpxk",
  authDomain: "invitex-database.firebaseapp.com",
  databaseURL: "https://invitex-database-default-rtdb.firebaseio.com",
  projectId: "invitex-database",
  storageBucket: "invitex-database.firebasestorage.app",
  messagingSenderId: "1094924148148",
  appId: "1:1094924148148:web:0806e45d8127c4e8f466e1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;