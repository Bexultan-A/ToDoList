"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";

export const useRequireAuth = (redirectUrl = "/sign-in") => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, router, redirectUrl]);

  return { isAuthenticated };
};
