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
  if (email) {
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("email", "==", email));
    (await getDocs(usersQuery)).forEach(async (doc) => {
      userData = { id: doc.id, ...doc.data() };
    });
  }
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

export const fetchExpenseCategories = async (userData: any) => {
  let categories: any = [];
  const categoriesRef = collection(db, "categories");
  const userRef = doc(db, "users", userData.id);
  const q = query(
    categoriesRef,
    orderBy("name", "asc"),
    where("user_id", "==", userRef)
  );
  const cats = await (await getDocs(q)).docs;

  await Promise.all(
    cats.map(async (doc: any) => {
      const newItem: any = { id: doc.id, ...doc.data() };
      categories = [...categories, newItem];
    })
  );

  return categories;
};

export const fetchCategories = async (newItem: any) => {
  const category: any = await getDoc(newItem?.cat_id);

  if (category.exists()) {
    newItem.category = { cat_id: category.id, ...category.data() };
  }

  return newItem;
};

export const fetchExpenses = async (userData: any) => {
  let newExpenses: any = [];
  if (userData) {
    const expensesRef = collection(db, "expenses");
    const userRef = doc(db, "users", userData?.id);

    const q = query(
      expensesRef,
      orderBy("timestamp", "desc"),
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
  }

  return newExpenses;
};

export const fetchTypes = async (userData: any) => {
  let catTypes: any = [];
  if (userData) {
    const typesRef = collection(db, "types");
    const userRef = doc(db, "users", userData?.id);
    const q = query(
      typesRef,
      orderBy("name", "asc"),
      where("user_id", "==", userRef)
    );
    const types = await(await getDocs(q)).docs;

    await Promise.all(
      types.map(async (doc: any) => {
        const newItem: any = { id: doc.id, ...doc.data() };
        catTypes = [...catTypes, newItem];
      })
    );

    return catTypes;
  }
};