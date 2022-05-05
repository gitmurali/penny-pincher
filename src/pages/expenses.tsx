import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { db } from "../../firebase";
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Notification from "../components/Notification";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useUserData } from "../hooks/useUserData";
import { fetchExpenseCategories, fetchUser } from "../utils";
import { getSession } from "next-auth/react";
import { Session } from "next-auth/core/types";

interface IFormInput {
  price: string;
  quantity: string;
  currency: string;
  cat_id: string;
  expenseDate: Date | null;
}

type Props = {
  cats: any;
};

const Locale = {
  GBP: "en-GB",
  USD: "en-US",
  INR: "en-IN",
};

export default function Expenses({ cats }: Props) {
  const [value, setValue] = useState<Date | null>();
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const { userData } = useUserData();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { currency, cat_id, price, quantity } = data;
    await addDoc(collection(db, "expenses"), {
      cat_id: doc(db, "categories/" + cat_id),
      currency,
      locale: Locale[currency as keyof typeof Locale],
      price: +price * +quantity,
      quantity: +quantity,
      expenseDate: value,
      timestamp: serverTimestamp(),
      user_id: doc(db, `users/${userData.id}`),
    });

    setOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 12 }}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Typography variant="h4" sx={{ mb: 6 }}>
          Create an Expense
        </Typography>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="medium">
              <TextField
                select
                fullWidth
                label="Select Type"
                inputProps={register("currency", {
                  required: "Please select type",
                })}
                error={errors.currency ? true : false}
                helperText={errors.currency?.message}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="medium">
              <TextField
                select
                fullWidth
                label="Select Category"
                defaultValue=""
                inputProps={register("cat_id", {
                  required: "Please select category",
                })}
                error={errors.cat_id ? true : false}
                helperText={errors.cat_id?.message}
              >
                {JSON.parse(cats).map((cat: any) => (
                  <MenuItem value={cat.id} key={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date of expense"
                value={value}
                minDate={new Date("2017-01-01")}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField inputProps={register("expenseDate")} {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              id="title"
              label="Enter an amount"
              type="text"
              fullWidth
              error={errors.price ? true : false}
              helperText={errors.price ? errors.price.message : null}
              {...register("price", {
                required: {
                  value: true,
                  message: "Please enter amount",
                },
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              id="title"
              label="Quantity"
              type="text"
              fullWidth
              error={errors.quantity ? true : false}
              helperText={errors.quantity ? errors.quantity.message : null}
              {...register("quantity", {
                required: {
                  value: true,
                  message: "Please enter quantity",
                },
              })}
            />
          </Grid>
          <Button variant="contained" type="submit" sx={{ m: 2 }}>
            Create an expense
          </Button>
        </Grid>
      </form>
      <Notification
        open={open}
        setOpen={setOpen}
        severity="success"
        message="Expense logged!"
      />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const session: Session | null = await getSession(ctx);
  const userData = await fetchUser(session?.user?.email as string);
  const cats = await fetchExpenseCategories(userData);

  return {
    props: {
      cats: JSON.stringify(cats),
    },
  };
};
