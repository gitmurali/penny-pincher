import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { signIn, useSession } from "next-auth/react";
import Notification from "./Notification";

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

  useEffect(() => {
    if (status === "unauthenticated") signIn();
  }, [session, status]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data?.name !== "") {
      const newTypeRef = doc(collection(db, "types"));
      await setDoc(newTypeRef, data);
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
