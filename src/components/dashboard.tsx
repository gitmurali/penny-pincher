import React from "react";

import { useSession } from "next-auth/react";
import ExpensesChart from "./ExpensesChart";
import ExpensesGrid from "./ExpensesGrid";
import { Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Dashboard = ({ expenses, userData, loading }: any) => {
  const { data: session, status } = useSession();
  const isSessionLoading = status === "loading";
  console.log(session);
  return (
    <>
      {isSessionLoading || loading ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          marginTop={4}
        >
          <Grid item>
            <Box sx={{ display: "flex" }}>
              <CircularProgress size="8rem" />
            </Box>
            <Typography
              variant="h4"
              align="center"
              alignItems="center"
              sx={{ mt: 10 }}
            >
              Loaidng your app..
            </Typography>
          </Grid>
        </Grid>
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
