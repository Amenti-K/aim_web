"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function AppEntry() {
  const router = useRouter();
  const { accessToken, company } = useAppSelector((state) => state.userAuth);

  // useEffect(() => {
  //   // The AppRouteLayout handles the unauthenticated and setup redirection.
  //   // If the user lands here and passes the layout guard, we send them to the dashboard.
  //   if (accessToken && company?.setupStep === 4) {
  //     router.replace("/app/dashboard");
  //   }
  // }, [accessToken, company, router]);

  return null; // The layout's loading spinner handles any flash before redirect
}
