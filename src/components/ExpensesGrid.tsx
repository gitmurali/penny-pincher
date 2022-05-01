import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TablePagination, Typography } from "@mui/material";

export default function ExpenseGrid({ data: expenses }: any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getFormattedPrice = (expense: any) => {
    return new Intl.NumberFormat(expense.locale, {
      style: "currency",
      currency: expense.currency,
    }).format(expense.price);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
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
              {expenses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((expense: any) => (
                  <TableRow
                    key={expense.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {expense.category.name}
                    </TableCell>
                    <TableCell align="right">
                      {getFormattedPrice(expense)}
                    </TableCell>
                    <TableCell align="right">{expense.quantity}</TableCell>
                    <TableCell align="right">
                      {new Date(expense.expenseDate).toDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(
                        expense.timestamp.seconds * 1000
                      ).toDateString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={expenses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
}
