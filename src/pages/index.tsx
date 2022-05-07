import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import Dashboard from "../components/dashboard";
import { fetchExpenses, fetchUser } from "../utils";

export default function Home({}: any) {
  const { data: session } = useSession();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (session) {
        setLoading(true);
        const userData = await fetchUser(session?.user?.email as string);
        const exps = await fetchExpenses(userData);
        setExpenses(exps);
        setUser(userData);
        setLoading(false);
      }
    }

    session?.user?.email && fetchData();
  }, [session?.user?.email]);

  return (
    <div>
      <main>
        <Dashboard expenses={expenses} userData={user} loading={loading} />
      </main>
    </div>
  );
}
