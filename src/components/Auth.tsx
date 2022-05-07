import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import React, { useEffect } from "react";
import { useUserData } from "../hooks/useUserData";
import { initUser } from "../utils";

type Props = {
  children: React.ReactNode;
};

export default function Auth({ children }: Props) {
  const { userData, session } = useUserData();

  useEffect(() => {
    session?.user?.email && initUser(session?.user?.email);
  }, [session]);

  return (
    <>
      {userData?.email && session?.user?.email ? (
        children
      ) : (
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
      )}
    </>
  );
}
