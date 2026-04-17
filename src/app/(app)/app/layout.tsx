"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";

export default function AppRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname() || "";

  const { accessToken, company, loading } = useAppSelector(
    (state) => state.userAuth,
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const isAuthPage = pathname.startsWith("/app/auth");
    const isSetupPage = pathname.startsWith("/app/setup");

    // Step 1: Auth check
    if (!accessToken) {
      if (!isAuthPage) {
        router.replace("/app/auth/login");
      }
      return;
    }

    // Step 2: Setup check
    if (company && company.setupStep !== 4) {
      if (!isSetupPage && !isAuthPage) {
        router.replace("/app/setup");
      }
      return;
    }

    // Step 3: Prevent authenticated users from visiting auth/root pages
    const isAppRoot = pathname === "/app";
    if (company?.setupStep === 4 && (isAuthPage || isAppRoot)) {
      router.replace("/app/dashboard");
    }
  }, [isMounted, accessToken, company, pathname, router]);

  if (!isMounted || loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
