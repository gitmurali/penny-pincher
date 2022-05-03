import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
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

export const fetchCategories = async (newItem: any) => {
  let category: any = await getDoc(newItem?.cat_id);

  if (category.exists()) {
    newItem.category = { cat_id: category.id, ...category.data() };
  }

  return newItem;
};

export const fetchExpenses = async (userData: any) => {
  const expensesRef = collection(db, "expenses");
  const userRef = doc(db, "users", userData?.id);
  let newExpenses: any = [];

  const q = query(
    expensesRef,
    orderBy("price", "desc"),
    where("user_id", "==", userRef)
  );

  const expenses = await (await getDocs(q)).docs;

  await Promise.all(
    expenses.map(async (doc: any) => {
      let newItem: any = { id: doc.id, ...doc.data() };

      if (newItem?.expenseDate) {
        newItem.expenseDate = doc.data().expenseDate.toDate();
      }

      if (newItem?.cat_id && newItem.user_id) {
        newItem = await fetchCategories(newItem);
      }
      newExpenses = [...newExpenses, newItem];
    })
  );

  return newExpenses;
};
