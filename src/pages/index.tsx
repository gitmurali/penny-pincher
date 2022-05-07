import { GetServerSideProps } from "next";
import { Session } from "next-auth/core/types";
import { getSession } from "next-auth/react";
import Dashboard from "../components/dashboard";
import { fetchExpenses, fetchUser } from "../utils";

export default function Home({ data }: any) {
  return (
    <div>
      <main>
        <Dashboard
          expenses={data.expenses ? JSON.parse(data.expenses) : []}
          userData={data.userData}
        />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;
  let expenses = [];
  let userData = null;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const session: Session | null = await getSession(ctx);

  if (session) {
    userData = await fetchUser(session?.user?.email as string);
    expenses = await fetchExpenses(userData);
  }

  return {
    props: {
      data: {
        expenses: expenses ? JSON.stringify(expenses) : [],
        userData,
      },
    },
  };
};
