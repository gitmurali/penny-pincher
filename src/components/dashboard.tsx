import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  documentId,
  doc,
} from "firebase/firestore";

import ExpensesChart from "./ExpensesChart";
import ExpensesGrid from "./ExpensesGrid";
import { Typography } from "@mui/material";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [expenses, setExpenses] = useState<any>([]);
  const [userData, setUserData] = useState<any>();
  const loading = status === "loading";

  useEffect(() => {
    const fetchUser = async () => {
      const usersRef = collection(db, "users");
      const usersQuery = query(
        usersRef,
        where("email", "==", session?.user?.email)
      );
      (await getDocs(usersQuery)).forEach(async (doc) => {
        setUserData({ id: doc.id, ...doc.data() });
      });
    };

    session?.user?.email && fetchUser();
  }, [session]);

  useEffect(() => {
    setExpenses([]);
    const fetchExpenses = async () => {
      const expensesRef = collection(db, "expenses");
      const userRef = doc(db, "users", userData.id);
      const q = query(
        expensesRef,
        orderBy("price", "desc"),
        where("user_id", "==", userRef)
      );

      (await getDocs(q)).forEach(async (doc) => {
        let newItem: any = { id: doc.id, ...doc.data() };

        if (newItem?.expenseDate) {
          newItem.expenseDate = doc.data().expenseDate.toDate();
        }

        if (newItem?.cat_id && newItem.user_id) {
          let category: any = await getDoc(newItem?.cat_id);
          if (category.exists()) {
            newItem.category = { cat_id: category.id, ...category.data() };
            setExpenses((prevState: Array<unknown>) => [...prevState, newItem]);
          }
        }
      });
    };

    userData?.email && fetchExpenses();
  }, [userData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {session ? (
        expenses.length > 0 ? (
          <>
            <ExpensesChart data={expenses} userData={userData} />
            <ExpensesGrid data={expenses} />
          </>
        ) : (
          <Typography
            variant="h4"
            align="center"
            alignItems="center"
            sx={{ mt: 10 }}
          >
            No data to display
          </Typography>
        )
      ) : (
        <p>
          <p>You are not permitted to see this page.</p>
          <button onClick={() => signIn()}>Sign in</button>
        </p>
      )}
    </>
  );
}
