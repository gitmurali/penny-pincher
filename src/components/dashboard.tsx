import React from "react";

import { useSession } from "next-auth/react";
import ExpensesChart from "./ExpensesChart";
import ExpensesGrid from "./ExpensesGrid";
import Loader from "./ui/Loader";

const Dashboard = ({ expenses, userData, loading }: any) => {
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";
  console.log(session);
  return (
    <>
      {isSessionLoading || loading ? (
        <Loader />
      ) : expenses.length > 0 ? (
        <>
          <ExpensesChart data={expenses} userData={userData} />
          <ExpensesGrid data={expenses} />
        </>
      ) : null}
    </>
  );
};

export default Dashboard;
