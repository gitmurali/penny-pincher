import React, { useState } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import ExpensesChart from "./ExpensesChart";
import ExpensesGrid from "./ExpensesGrid";
import { Typography } from "@mui/material";

const Dashboard = ({ expenses, userData }: any) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

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
};

export default Dashboard;
