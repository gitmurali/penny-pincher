import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function ExpenseGrid({ data: expenses }: any) {
  const getFormattedPrice = (expense: any) => {
    return new Intl.NumberFormat(expense.locale, {
      style: "currency",
      currency: expense.currency,
    }).format(expense.price);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4, pt: 2 }}>
      <Typography variant="h4" sx={{ pl: 2 }}>
        Expense log
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Date of expense</TableCell>
            <TableCell align="right">Date of Log</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense: any) => (
            <TableRow
              key={expense.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {expense.category.name}
              </TableCell>
              <TableCell align="right">{getFormattedPrice(expense)}</TableCell>
              <TableCell align="right">{expense.quantity}</TableCell>
              <TableCell align="right">
                {new Date(expense.expenseDate).toDateString()}
              </TableCell>
              <TableCell align="right">
                {new Date(expense.timestamp.seconds * 1000).toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
