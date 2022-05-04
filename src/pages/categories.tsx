import React from "react";
import Categories from "../components/categories";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { fetchTypes } from "../utils";

type Props = {
  types: any;
};

export default function CategoryPage({ types }: Props) {
  return <Categories types={types} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const session = await getSession(ctx);
  let userData: any;

  const usersRef = collection(db, "users");

  const usersQuery = query(
    usersRef,
    where("email", "==", session?.user?.email)
  );

  (await getDocs(usersQuery)).forEach(async (doc) => {
    userData = { id: doc.id, ...doc.data() };
  });

  const types = await fetchTypes(userData);

  return {
    props: {
      types: JSON.stringify(types),
    },
  };
};
