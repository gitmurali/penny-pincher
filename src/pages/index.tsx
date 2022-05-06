import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { Session } from "next-auth/core/types";
import { getSession } from "next-auth/react";
import { db } from "../../firebase";
import Dashboard from "../components/dashboard";
import { fetchExpenses, fetchUser } from "../utils";

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
  const session: Session | null = await getSession(ctx);
  const userData = await fetchUser(session?.user?.email as string);
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
