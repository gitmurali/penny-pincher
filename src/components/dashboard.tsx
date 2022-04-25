import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { db } from "../../firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import ExpensesChart from "./ExpensesChart";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [expenses, setExpenses] = useState<any>([]);
  const loading = status === "loading";

  useEffect(() => {
    setExpenses([]);
    const fetchExpenses = async () => {
      (await getDocs(collection(db, "expenses"))).forEach(async (doc) => {
        let newItem: any = { id: doc.id, ...doc.data() };
        if (newItem?.cat_id) {
          let category: any = await getDoc(newItem?.cat_id);
          if (category.exists()) {
            newItem.category = { cat_id: category.id, ...category.data() };
            setExpenses((prevState: Array<unknown>) => [...prevState, newItem]);
          }
        }
      });
    };
    fetchExpenses();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {session ? (
        <>
          <ExpensesChart data={expenses} />
        </>
      ) : (
        <p>
          <p>You are not permitted to see this page.</p>
          <button onClick={() => signIn()}>Sign in</button>
        </p>
      )}
    </>
  );
}
