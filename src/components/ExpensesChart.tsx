import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Grid, Paper, Typography, Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: any;
};

export default function ExpensesChart({ data }: Props) {
  const options = {
    plugins: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    },
  };
  const pieData = {
    labels: data.map((item: any) => item.category.name),
    datasets: [
      {
        label: "expenses",
        options: {
          responsive: true,
        },
        data: data.map((item: any) => item.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Paper elevation={3} sx={{ mt: 3, width: 350 }}>
      <Box
        sx={{
          height: 350,
          p: 3,
        }}
      >
        <Grid container direction="column">
          <Grid item xs={6}>
            <Typography variant="h5">Total Expenses</Typography>
          </Grid>
          <Grid item xs={6}>
            <Pie data={pieData} options={options} style={{ marginTop: 10 }} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
