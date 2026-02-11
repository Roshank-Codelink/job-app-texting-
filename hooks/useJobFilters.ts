import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useState, useEffect, useTransition } from "react"

type Filters = {
  date: string | null
  mode: string | null
  type: string[]
  department: string[]
}

export function useJobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const [localFilters, setLocalFilters] = useState<Filters>({ 
    date: searchParams.get("date"),
    mode: searchParams.get("mode"),
    type: searchParams.get("type")?.split(",") ?? [],
    department: searchParams.get("department")?.split(",") ?? [],
  })

  // ✅ URL → local state sync (safe)
  useEffect(() => {
    const next: Filters = {
      date: searchParams.get("date"),
      mode: searchParams.get("mode"),
      type: searchParams.get("type")?.split(",") ?? [],
      department: searchParams.get("department")?.split(",") ?? [],
    }

    const isSame =
      next.date === localFilters.date &&
      next.mode === localFilters.mode &&
      next.type.join(",") === localFilters.type.join(",") &&
      next.department.join(",") === localFilters.department.join(",")

    if (!isSame) {
      setLocalFilters(next)
    }
  }, [searchParams])

  // ✅ URL updater
  const updateURL = useCallback((filters: Filters) => {
    const params = new URLSearchParams(searchParams.toString())

    filters.date ? params.set("date", filters.date) : params.delete("date")
    filters.mode ? params.set("mode", filters.mode) : params.delete("mode")

    filters.type.length
      ? params.set("type", filters.type.join(","))
      : params.delete("type")

    filters.department.length
      ? params.set("department", filters.department.join(","))
      : params.delete("department")

    params.delete("page") // pagination reset

    const url = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname

    startTransition(() => {
      router.push(url, { scroll: false })
    })
  }, [searchParams, pathname, router])

  // setters
  const setDate = (v: string | null) => {
    const next = { ...localFilters, date: v }
    setLocalFilters(next)
    updateURL(next)
  }

  const setWorkMode = (v: string | null) => {
    const next = { ...localFilters, mode: v }
    setLocalFilters(next)
    updateURL(next)
  }

  const setWorkType = (v: string[]) => {
    const next = { ...localFilters, type: v }
    setLocalFilters(next)
    updateURL(next)
  }

  const setDepartment = (v: string[]) => {
    const next = { ...localFilters, department: v }
    setLocalFilters(next)
    updateURL(next)
  }

  const toggleWorkType = (value: string) => {
    setWorkType(
      localFilters.type.includes(value)
        ? localFilters.type.filter(t => t !== value)
        : [...localFilters.type, value]
    )
  }

  const toggleDepartment = (value: string) => {
    setDepartment(
      localFilters.department.includes(value)
        ? localFilters.department.filter(d => d !== value)
        : [...localFilters.department, value]
    )
  }

  const clearAllFilters = () => {
    const cleared: Filters = {
      date: null,
      mode: null,
      type: [],
      department: [],
    }
    setLocalFilters(cleared)
    updateURL(cleared)
  }

  return {
    date: localFilters.date,
    workMode: localFilters.mode,
    workType: localFilters.type,
    department: localFilters.department,
    isPending,

    setDate,
    setWorkMode,
    setWorkType,
    setDepartment,

    toggleWorkType,
    toggleDepartment,
    clearAllFilters,

    hasFilters:
      !!localFilters.date ||
      !!localFilters.mode ||
      localFilters.type.length > 0 ||
      localFilters.department.length > 0,

    activeFiltersCount:
      (localFilters.date ? 1 : 0) +
      (localFilters.mode ? 1 : 0) +
      localFilters.type.length +
      localFilters.department.length,
  }
}
