import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { db } from "../../firebase";
import Dashboard from "../components/dashboard";
import { fetchExpenses } from "../utils";

export default function Home({ data }: any) {
  return (
    <div>
      <main>
        <Dashboard
          expenses={JSON.parse(data.expenses)}
          userData={data.userData}
        />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const session = await getSession(ctx);
  let userData: any;

  const usersRef = collection(db, "users");

  const usersQuery = query(
    usersRef,
    where("email", "==", session?.user?.email)
  );

  (await getDocs(usersQuery)).forEach(async (doc) => {
    userData = { id: doc.id, ...doc.data() };
  });

  const expenses = await fetchExpenses(userData);

  return {
    props: {
      data: {
        expenses: JSON.stringify(expenses),
        userData,
      },
    },
  };
};
