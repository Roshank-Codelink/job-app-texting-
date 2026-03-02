"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { employerInfoApi } from "@/api_config/EmployerInfoApi/employerInfo";

const LOGOS_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_LOGOS_ENDPOINT ?? "";

type EmployerLogoContextValue = {
  companyLogoUrl: string | null;
  isPaid: boolean;
  isLoaded: boolean;
  setCompanyLogoUrl: (url: string | null) => void;
  setIsPaid: (status: boolean) => void;
};

const EmployerLogoContext = createContext<EmployerLogoContextValue | null>(null);

export function EmployerLogoProvider({ children }: { children: ReactNode }) {
  const [companyLogoUrl, setCompanyLogoUrlState] = useState<string | null>(null);
  const [isPaid, setIsPaidState] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const setCompanyLogoUrl = useCallback((url: string | null) => {
    setCompanyLogoUrlState(url);
  }, []);

  const setIsPaid = useCallback((status: boolean) => {
    setIsPaidState(status);
  }, []);

  useEffect(() => {
    employerInfoApi()
      .then((data) => {
        if (data?.companyLogo && LOGOS_ENDPOINT) {
          setCompanyLogoUrlState(`${LOGOS_ENDPOINT}/${data.companyLogo}`);
        }
        if (data?.isPaid !== undefined) {
          setIsPaidState(data.isPaid);
        }
      })
      .catch(() => {
        // Keep state null on error (e.g. unauthenticated)
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  return (
    <EmployerLogoContext.Provider value={{ companyLogoUrl, isPaid, isLoaded, setCompanyLogoUrl, setIsPaid }}>
      {children}
    </EmployerLogoContext.Provider>
  );
}

export function useEmployerLogo(): EmployerLogoContextValue {
  const ctx = useContext(EmployerLogoContext);
  if (!ctx) {
    return {
      companyLogoUrl: null,
      isPaid: false,
      isLoaded: false,
      setCompanyLogoUrl: () => {},
      setIsPaid: () => {},
    };
  }
  return ctx;
}
