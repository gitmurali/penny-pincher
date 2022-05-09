import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "../utils";

export const useUserData = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const isSessionLoading = status === "loading";

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const user = await fetchUser(session?.user?.email as string);
      setLoading(false);
      setUserData(user);
    }
    session?.user?.email && getUser();
  }, [session]);

  return { userData, session, loading, isSessionLoading };
};
