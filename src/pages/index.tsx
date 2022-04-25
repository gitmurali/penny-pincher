import Head from "next/head";
import Categories from "../components/categories";
import Dashboard from "../components/dashboard";

export default function Home() {
  return (
    <div>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}
