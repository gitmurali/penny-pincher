import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export const fetchUser = async (email: string) => {
  let userData;
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("email", "==", email));
  (await getDocs(usersQuery)).forEach(async (doc) => {
    userData = { id: doc.id, ...doc.data() };
  });
  return userData;
};

export const initUser = async (email: string) => {
  const userData = (await fetchUser(email)) as any;
  !userData?.email &&
    (await addDoc(collection(db, "users"), {
      email,
      timestamp: serverTimestamp(),
    }));
};
