import React, { useEffect } from "react";
import { useUserData } from "../hooks/useUserData";
import { initUser } from "../utils";
import Loader from "./ui/Loader";
import Video from "./ui/Video";

type Props = {
  children: React.ReactNode;
};

export default function Auth({ children }: Props) {
  const { userData, session, loading, isSessionLoading } = useUserData();

  useEffect(() => {
    session?.user?.email && initUser(session?.user?.email);
  }, [session]);

  return (
    <>
      {userData?.email && session?.user?.email ? (
        children
      ) : loading || isSessionLoading ? (
        <Loader />
      ) : (
        <Video />
      )}
    </>
  );
}
