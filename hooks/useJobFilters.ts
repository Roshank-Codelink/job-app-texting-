import { useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"

export function useJobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 🔑 ALWAYS read text from URL
  const text = searchParams.get("text")

  const date = searchParams.get("date")
  const workMode = searchParams.get("mode")

  const workTypeParam = searchParams.get("type")
  const workType = workTypeParam ? workTypeParam.split(",") : []

  const departmentParam = searchParams.get("department")
  const department = departmentParam ? departmentParam.split(",") : []

  const updateFilters = useCallback(
    (updates: {
      date?: string | null
      mode?: string | null
      type?: string[]
      department?: string[]
    }) => {
      const params = new URLSearchParams(searchParams.toString())

      // ✅ PRESERVE text ALWAYS
      if (text) {
        params.set("text", text)
      }

      // Date
      if (updates.date !== undefined) {
        updates.date ? params.set("date", updates.date) : params.delete("date")
      }

      // Mode
      if (updates.mode !== undefined) {
        updates.mode ? params.set("mode", updates.mode) : params.delete("mode")
      }

      // Type
      if (updates.type !== undefined) {
        updates.type.length
          ? params.set("type", updates.type.join(","))
          : params.delete("type")
      }

      // Department
      if (updates.department !== undefined) {
        updates.department.length
          ? params.set("department", updates.department.join(","))
          : params.delete("department")
      }

      params.delete("page")

      const queryString = params.toString().replace(/\+/g, "%20")

      router.push(`/candidate/jobs?${queryString}`, { scroll: false })
    },
    [router, searchParams, text]
  )

  const setDate = (v: string | null) => updateFilters({ date: v })
  const setWorkMode = (v: string | null) => updateFilters({ mode: v })
  const setWorkType = (v: string[]) => updateFilters({ type: v })
  const setDepartment = (v: string[]) => updateFilters({ department: v })

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
    const params = new URLSearchParams()

    // ✅ KEEP text
    if (text) params.set("text", text)

    router.push(`/candidate/jobs?${params.toString()}`, { scroll: false })
  }

  return {
    date,
    workMode,
    workType,
    department,
    setDate,
    setWorkMode,
    setWorkType,
    setDepartment,
    toggleWorkType,
    toggleDepartment,
    clearAllFilters,
    hasFilters:
      !!(date || workMode || workType.length || department.length),
  }
}
