import React, { useEffect, useState } from "react";
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
import { Grid, Paper, Button } from "@mui/material";
import SimpleDialog from "./ui/SimpleModal";
import DateRangeSelector from "./ui/DateRangeSelector";
import { barOptions, labels, pieOptions, random_rgba } from "../constants";
import {
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { startOfMonth, endOfMonth } from "date-fns";

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
  userData: any;
};

export default function ExpensesChart({ data, userData }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [dateRange, setDateRange] = React.useState<any>({
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
  });
  const [expenses, setExpenses] = useState<any>([]);

  useEffect(() => {
    const getPieData = async () => {
      setExpenses([]);
      const expensesRef = collection(db, "expenses");
      const userRef = doc(db, "users", userData.id);
      const q = query(
        expensesRef,
        orderBy("expenseDate", "asc"),
        where("user_id", "==", userRef),
        where("expenseDate", ">", dateRange.startDate),
        where("expenseDate", "<", dateRange.endDate)
      );

      (await getDocs(q)).forEach(async (doc: any) => {
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
    getPieData();
  }, [dateRange, userData.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const incomeByMonth = async () => {
    const income: any = [];
    const incomeRef = collection(db, "income");
    const userRef = doc(db, "users", userData.id);
    const q = query(incomeRef, where("user_id", "==", userRef));

    (await getDocs(q)).forEach(async (doc: any) => {
      income.push({ id: doc.id, ...doc.data() });
    });

    return income;
  };

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
    labels: expenses?.map((item: any) => item.category.name),
    datasets: [
      {
        data: expenses?.map((item: any) => item.price),
        backgroundColor: expenses?.map((item: any) => random_rgba()),
        borderColor: expenses?.map((item: any) => random_rgba()),
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: expensesByMonth(),
        backgroundColor: random_rgba(),
      },
    ],
  };

  console.log(expenses);
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={4}>
        <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
          <Button variant="contained" sx={{ m: 2 }} onClick={handleClickOpen}>
            Set Date range
          </Button>
          <Pie data={pieData} options={pieOptions} style={{ marginTop: 10 }} />
          <SimpleDialog
            open={open}
            onClose={handleClose}
            title="Select date range"
          >
            <DateRangeSelector open={open} setDateRange={setDateRange} />
          </SimpleDialog>
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
