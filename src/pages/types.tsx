import React from "react";
import Types from "../components/types";
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {};

export default function types({}: Props) {
  return <Types />;
}
