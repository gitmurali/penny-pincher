import React, { useState } from "react";
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

interface IFormInput {
  amount: number;
  date: Date | null;
  currency: string;
  user_id: string;
}

type Props = {};

const Locale = {
  GBP: "en-GB",
  USD: "en-US",
  INR: "en-IN",
};

export default function Income({}: Props) {
  const [value, setValue] = useState<Date | null>();
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>();
  const { userData } = useUserData();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { currency, amount } = data;
    await addDoc(collection(db, "income"), {
      currency,
      locale: Locale[currency as keyof typeof Locale],
      amount: +amount,
      date: value,
      timestamp: serverTimestamp(),
      user_id: doc(db, `users/${userData.id}`),
    });
    setOpen(true);
    reset();
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 12 }}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Typography variant="h4" sx={{ mb: 4 }}>
          Create an Income
        </Typography>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <FormControl sx={{ minWidth: 200 }} size="medium">
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date of Income"
                value={value}
                minDate={new Date("2017-01-01")}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField inputProps={register("date")} {...params} />
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
              error={errors.amount ? true : false}
              helperText={errors.amount ? errors.amount.message : null}
              {...register("amount", {
                required: {
                  value: true,
                  message: "Please enter amount",
                },
              })}
            />
          </Grid>
        </Grid>
        <Button variant="contained" type="submit" sx={{ mt: 2 }} fullWidth>
          Create an Income
        </Button>
      </form>
      <Notification
        open={open}
        setOpen={setOpen}
        severity="success"
        message="Income logged!"
      />
    </Container>
  );
}
