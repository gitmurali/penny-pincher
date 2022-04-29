import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";

export const useUserData = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const fetchUser = async () => {
      const usersRef = collection(db, "users");
      const usersQuery = query(
        usersRef,
        where("email", "==", session?.user?.email)
      );
      (await getDocs(usersQuery)).forEach(async (doc) => {
        setUserData({ id: doc.id, ...doc.data() });
      });
    };

    session?.user?.email && fetchUser();
  }, [session]);

  return { userData, session };
};
