"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import SplashScreen from "./SplashScreen";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/professional");
  }, [router]);

  return (
    <>
      {/* <SplashScreen /> */}
    </>
  );
}
