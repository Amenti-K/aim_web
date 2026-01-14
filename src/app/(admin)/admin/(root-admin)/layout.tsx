"use client";

import React, { useEffect } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";
import { useRouter, usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken } = useAppSelector((state) => state.adminAuth);

  useEffect(() => {
    const isLoginPage = pathname?.includes("/sign-in");

    if (!accessToken && !isLoginPage) {
      router.replace("/admin/sign-in");
    }
  }, [accessToken, router]);

  if (!accessToken && !pathname?.includes("/sign-in")) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {pathname
                  ?.split("/")
                  .filter(Boolean)
                  .map((segment, index, array) => {
                    const isLast = index === array.length - 1;
                    const href = `/${array.slice(0, index + 1).join("/")}`;
                    const title =
                      segment.charAt(0).toUpperCase() + segment.slice(1);
                    // Skip numeric IDs directly in path if preferred, or format them?
                    // For now, capitalize everything.

                    return (
                      <React.Fragment key={href}>
                        <BreadcrumbItem className="hidden md:block">
                          {isLast ? (
                            <BreadcrumbPage>{title}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                      </React.Fragment>
                    );
                  })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
