import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
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
import Notification from "./Notification";
import { useUserData } from "../hooks/useUserData";
interface IFormInput {
  name: string;
  type_id: string;
}

type Props = {};

export default function Categories({}: Props) {
  const [types, setTypes] = useState<any>([]);
  const [selectedType, setSelectedType] = useState("");
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const { userData } = useUserData();

  useEffect(() => {
    // userData?.id && fetchTypes();
  }, [userData]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await addDoc(collection(db, "categories"), {
      ...data,
      type_id: doc(db, `/types/${data.type_id}`),
      user_id: doc(db, `users/${userData?.id}`),
      timestamp: serverTimestamp(),
    });

    setOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 12 }}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Typography variant="h4" sx={{ mb: 6 }}>
          Create Categories
        </Typography>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <TextField
                select
                fullWidth
                label="Select Type"
                defaultValue=""
                inputProps={register("type_id", {
                  required: "Please select type",
                })}
                error={errors.type_id ? true : false}
                helperText={errors.type_id?.message}
              >
                {types?.map((type: any) => {
                  return (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              id="title"
              label="Enter category"
              type="text"
              fullWidth
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name.message : null}
              {...register("name", {
                required: {
                  value: true,
                  message: "Please enter a category name.",
                },
                maxLength: {
                  value: 15,
                  message:
                    "Please enter a category that is 15 characters or less.",
                },
              })}
            />
          </Grid>

          <Button variant="contained" type="submit" sx={{ m: 2 }}>
            Create Category
          </Button>
        </Grid>
      </form>
      <Notification
        open={open}
        setOpen={setOpen}
        severity="success"
        message="Category created successfully"
      />
    </Container>
  );
}
