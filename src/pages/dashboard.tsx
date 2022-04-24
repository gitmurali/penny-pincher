import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {session ? (
        <>
          <p>Super secret page!</p>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <p>
          <p>You are not permitted to see this page.</p>
          <button onClick={() => signIn()}>Sign in</button>
        </p>
      )}
    </>
  );
}
