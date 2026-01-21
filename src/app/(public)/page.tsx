"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin");
  }, []);

  return <div className="space-y-6"></div>;
};

export default LandingPage;
