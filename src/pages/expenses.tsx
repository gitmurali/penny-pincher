import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { db } from "../../firebase";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Notification from "../components/Notification";

interface IFormInput {
  price: string;
  quantity: string;
  currency: string;
  cat_id: string;
}

type Props = {};

const Locale = {
  GBP: "en-GB",
  USD: "en-US",
  INR: "en-IN",
};

export default function Expenses({}: Props) {
  const [cats, setCats] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(fetchCategories());
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // {
    //     "currency": "USD",
    //     "cat_id": "GONZpPW1TfVkjqr9pGll",
    //     "price": "12",
    //     "quantity": "2"
    // }
    const { currency, cat_id, price, quantity } = data;
    console.log("bobby", {
      cat_id: doc(db, "categories/" + cat_id),
      currency,
      locale: Locale[currency as keyof typeof Locale],
      price,
      quantity,
      timestamp: serverTimestamp(),
      user_id: doc(db, "users/exSHPC34bdhWtgxwyZsX"),
    });
    await addDoc(collection(db, "expenses"), {
      cat_id: doc(db, "categories/" + cat_id),
      currency,
      locale: Locale[currency as keyof typeof Locale],
      price,
      quantity,
      timestamp: serverTimestamp(),
      user_id: doc(db, "users/exSHPC34bdhWtgxwyZsX"),
    });

    setOpen(true);
  };

  const fetchCategories = async () => {
    const typesRef = collection(db, "categories");
    const q = query(typesRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCats(
        querySnapshot.docs.map((doc: any) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
    });
    return unsubscribe;
  };

  console.log(cats, selectedType);
  return session ? (
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
                defaultValue={selectedType}
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
                {cats.map((cat: any) => (
                  <MenuItem value={cat.id} key={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
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
  ) : null;
}
