import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";

type Props = {};

export default function Loader({}: Props) {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      marginTop={4}
    >
      <Grid item>
        <Box sx={{ display: "flex" }}>
          <CircularProgress size="8rem" />
        </Box>
        <Typography
          variant="h4"
          align="center"
          alignItems="center"
          sx={{ mt: 10 }}
        >
          Loading your app..
        </Typography>
      </Grid>
    </Grid>
  );
}
