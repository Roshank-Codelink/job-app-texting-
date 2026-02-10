import { useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"

export function useJobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read values directly from URL to ensure single source of truth
  const date = searchParams.get("date")
  const workMode = searchParams.get("mode")
  
  const workTypeParam = searchParams.get("type")
  const workType = workTypeParam ? workTypeParam.split(",") : []
  
  const departmentParam = searchParams.get("department")
  const department = departmentParam ? departmentParam.split(",") : []

  // Helper to update URL
  const updateFilters = useCallback((updates: {
    date?: string | null,
    mode?: string | null,
    type?: string[],
    department?: string[]
  }) => {
    const params = new URLSearchParams(searchParams.toString())

    // Handle Date
    if (updates.date !== undefined) {
      if (updates.date) params.set("date", updates.date)
      else params.delete("date")
    }

    // Handle Work Mode
    if (updates.mode !== undefined) {
      if (updates.mode) params.set("mode", updates.mode)
      else params.delete("mode")
    }

    // Handle Work Type
    if (updates.type !== undefined) {
      if (updates.type.length > 0) params.set("type", updates.type.join(","))
      else params.delete("type")
    }

    // Handle Department
    if (updates.department !== undefined) {
      if (updates.department.length > 0) params.set("department", updates.department.join(","))
      else params.delete("department")
    }

    router.push(
      params.toString() ? `/candidate/jobs?${params.toString()}` : "/candidate/jobs",
      { scroll: false }
    )
  }, [searchParams, router])

  // Specific setters
  const setDate = (newDate: string | null) => updateFilters({ date: newDate })
  const setWorkMode = (newMode: string | null) => updateFilters({ mode: newMode })
  const setWorkType = (newTypes: string[]) => updateFilters({ type: newTypes })
  const setDepartment = (newDepts: string[]) => updateFilters({ department: newDepts })

  const toggleWorkType = (value: string) => {
    const newTypes = workType.includes(value)
      ? workType.filter(t => t !== value)
      : [...workType, value]
    setWorkType(newTypes)
  }

  const toggleDepartment = (value: string) => {
    const newDepts = department.includes(value)
      ? department.filter(d => d !== value)
      : [...department, value]
    setDepartment(newDepts)
  }

  const clearAllFilters = () => {
    // Keep search and location, only remove filters
    const params = new URLSearchParams(searchParams.toString())
    
    // Explicitly remove filter keys
    params.delete("date")
    params.delete("mode")
    params.delete("type")
    params.delete("department")
    params.delete("page") // Reset page too

    // Use push instead of replace to fix mobile navigation stack
    router.push(
      params.toString() ? `/candidate/jobs?${params.toString()}` : "/candidate/jobs",
      { scroll: false }
    )
  }

  return {
    // Values
    date,
    workMode,
    workType,
    department,
    // Setters
    setDate,
    setWorkMode,
    setWorkType,
    setDepartment,
    // Helpers
    toggleWorkType,
    toggleDepartment,
    clearAllFilters,
    // Computed
    hasFilters: !!(date || workMode || workType.length > 0 || department.length > 0),
    activeFiltersCount: (date ? 1 : 0) + (workMode ? 1 : 0) + workType.length + department.length
  }
}
