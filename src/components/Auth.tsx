import { collection } from "firebase/firestore";
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

  return <>{userData?.email && session?.user?.email ? children : null}</>;
}
