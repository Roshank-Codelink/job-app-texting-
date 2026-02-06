"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { employerInfoApi } from "@/api_config/EmployerInfoApi/employerInfo";

const LOGOS_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_LOGOS_ENDPOINT ?? "";

type EmployerLogoContextValue = {
  companyLogoUrl: string | null;
  setCompanyLogoUrl: (url: string | null) => void;
};

const EmployerLogoContext = createContext<EmployerLogoContextValue | null>(null);

export function EmployerLogoProvider({ children }: { children: ReactNode }) {
  const [companyLogoUrl, setCompanyLogoUrlState] = useState<string | null>(null);
  const setCompanyLogoUrl = useCallback((url: string | null) => {
    setCompanyLogoUrlState(url);
  }, []);

  useEffect(() => {
    employerInfoApi()
      .then((data) => {
        if (data?.companyLogo && LOGOS_ENDPOINT) {
          setCompanyLogoUrlState(`${LOGOS_ENDPOINT}/${data.companyLogo}`);
        }
      })
      .catch(() => {
        // Keep state null on error (e.g. unauthenticated)
      });
  }, []);

  return (
    <EmployerLogoContext.Provider value={{ companyLogoUrl, setCompanyLogoUrl }}>
      {children}
    </EmployerLogoContext.Provider>
  );
}

export function useEmployerLogo(): EmployerLogoContextValue {
  const ctx = useContext(EmployerLogoContext);
  if (!ctx) {
    return {
      companyLogoUrl: null,
      setCompanyLogoUrl: () => {},
    };
  }
  return ctx;
}
