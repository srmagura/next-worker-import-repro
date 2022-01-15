import Head from "next/head";
import { useEffect, useState } from "react";

// Only instantiate worker in the browser
const worker =
  typeof Worker === "function"
    ? new Worker(new URL("../worker.js", import.meta.url))
    : undefined;

export default function Home() {
  const [message, setMessage] = useState();

  useEffect(() => {
    worker.addEventListener("message", ({ data }) => {
      setMessage(data);
    });
  });

  return (
    <div>
      <Head>
        <title>Next Worker Import Repro</title>
      </Head>
      The worker says: {message}
    </div>
  );
}
