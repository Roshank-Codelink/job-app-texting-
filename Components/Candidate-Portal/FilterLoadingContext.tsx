"use client"

import { createContext, useContext } from "react"

type FilterLoadingContextValue = {
  setFilterLoading: (loading: boolean) => void
}

const FilterLoadingContext = createContext<FilterLoadingContextValue | null>(null)

export function useFilterLoading() {
  return useContext(FilterLoadingContext)
}

export { FilterLoadingContext }
