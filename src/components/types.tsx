import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { signIn, useSession } from "next-auth/react";
import Notification from "./Notification";
import { useUserData } from "../hooks/useUserData";

type Props = {};

interface IFormInput {
  name: string;
}

export default function Types({}: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const { userData } = useUserData();

  useEffect(() => {
    if (status === "unauthenticated") signIn();
  }, [session, status]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    if (data?.name !== "") {
      await addDoc(collection(db, "types"), {
        name: data.name,
        timestamp: serverTimestamp(),
        user_id: doc(db, `users/${userData.id}`),
      });
      setOpen(true);
    }
  };
  return session ? (
    <Container maxWidth="md" sx={{ marginTop: 12 }}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Typography variant="h4" sx={{ mb: 6 }}>
          Create types
        </Typography>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <TextField
              variant="outlined"
              id="title"
              label="Post type"
              type="text"
              fullWidth
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name.message : null}
              {...register("name", {
                required: { value: true, message: "Please enter a type name." },
                maxLength: {
                  value: 15,
                  message: "Please enter a type that is 15 characters or less.",
                },
              })}
            />
          </Grid>

          <Button variant="contained" type="submit" sx={{ m: 2 }}>
            Create Type
          </Button>
        </Grid>
      </form>
      <Notification
        open={open}
        setOpen={setOpen}
        severity="success"
        message="Type created successfully"
      />
    </Container>
  ) : null;
}
