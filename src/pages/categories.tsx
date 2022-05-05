import React from "react";
import Categories from "../components/categories";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { fetchTypes, fetchUser } from "../utils";
import { Session } from "next-auth/core/types";

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

  const session: Session | null = await getSession(ctx);
  const userData = await fetchUser(session?.user?.email as string);
  const types = await fetchTypes(userData);

  return {
    props: {
      types: JSON.stringify(types),
    },
  };
};
