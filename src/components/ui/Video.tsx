import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import React from "react";

type Props = {};

export default function Video({}: Props) {
  return (
    <>
      <video autoPlay muted loop id="video">
        <source src="money.mp4" type="video/mp4" />
      </video>
      <div className="video-content">
        <h1>Penny pincher</h1>
        <p>Penny pincher app lets you track your expenses and income.</p>
        <Button variant="contained" onClick={() => signIn()}>
          Login
        </Button>
      </div>
    </>
  );
}
