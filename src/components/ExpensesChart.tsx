import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  Grid,
  Paper,
  Typography,
  Box,
  toggleButtonClasses,
} from "@mui/material";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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
      title: {
        display: true,
        text: "Total expenses",
      },
    },
  };
  const barOptions = {
    plugins: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Total expenses by Month",
      },
    },
  };
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const expensesByMonth = () => {
    const totalByMonth: any[] = new Array(11).fill(0);
    if (data) {
      Object.keys({ ...labels }).map((month) => {
        data.map((expense: any) => {
          if (new Date(expense?.expenseDate).getMonth() === +month) {
            totalByMonth[+month] += +expense.price;
          }
        });
      });
    }
    return totalByMonth;
  };

  const pieData = {
    labels: data.map((item: any) => item.category.name),
    datasets: [
      {
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
  console.log(expensesByMonth());
  const barData = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: expensesByMonth(),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={4}>
        <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
          <Pie data={pieData} options={options} style={{ marginTop: 10 }} />
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
          <Bar options={barOptions} data={barData} width={550} height={200} />
        </Paper>
      </Grid>
    </Grid>
  );
}
