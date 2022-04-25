import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Paper } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: any;
};

export default function ExpensesChart({ data }: Props) {
    const options = {
      plugins: {
        legend: {
          display: true,
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
      <Paper elevation={3}>
        <div style={{ position: "relative", height: "500px", width: "500px" }}>
          <Pie data={pieData} options={options} />
        </div>
      </Paper>
    );
}
