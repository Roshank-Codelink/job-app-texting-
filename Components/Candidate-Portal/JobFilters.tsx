import { Filter, X, Check, Calendar, Home, Briefcase, Building2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/Components/ui/sheet"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { departmentApiResponse } from "@/types/types"

const filterOptions = [
  { label: "Date posted", value: "date", icon: Calendar },
  { label: "Work mode", value: "workMode", icon: Home },
  { label: "Work type", value: "workType", icon: Briefcase },
  { label: "Department", value: "department", icon: Building2 },
]

const DATE_OPTIONS = [
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 3 days", value: "3d" },
  { label: "Last 7 days", value: "7d" },
]

const WORK_MODE_OPTIONS = [
  { label: "All jobs", value: "all_jobs" },
  { label: "Work from home", value: "work_from_home" },
  { label: "Work from office", value: "work_from_office" },
  { label: "Work from field", value: "work_from_field" },
]

const WORK_TYPE_OPTIONS = [
  { label: "Full time", value: "full_time" },
  { label: "Part time", value: "part_time" },
  { label: "Contract", value: "contract" },
]

const DEPARTMENT_OPTIONS = [
  { label: "IT / Software", value: "it_software" },
  { label: "Marketing / Sales", value: "marketing_sales" },
  { label: "Design / Creative", value: "design_creative" },
  { label: "Finance / Accounting", value: "finance_accounting" },
  { label: "HR / Recruitment", value: "hr_recruitment" },
  { label: "Operations / Management", value: "operations_management" },
  { label: "Customer Service", value: "customer_service" },
  { label: "Education / Training", value: "education_training" },
]

export default function JobFilters({ departmentres }: { departmentres: departmentApiResponse }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>("date")
  const [isScrolled, setIsScrolled] = useState(false)

  const [date, setDate] = useState<string | null>(searchParams.get("date"))
  const [workMode, setWorkMode] = useState<string | null>(searchParams.get("mode"))
  const [workType, setWorkType] = useState<string[]>(searchParams.get("type")?.split(",") || [])
  const [department, setDepartment] = useState<string[]>(searchParams.get("department")?.split(",") || [])


  const toggleMultiValue = (value: string, current: string[], setter: (v: string[]) => void) => {
    setter(current.includes(value) ? current.filter(v => v !== value) : [...current, value])
  }
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (date) params.set("date", date)
    else params.delete("date")

    if (workMode) params.set("mode", workMode)
    else params.delete("mode")

    if (workType.length) params.set("type", workType.join(","))
    else params.delete("type")

    if (department.length) params.set("department", department.join(","))
    else params.delete("department")

    router.replace(
      params.toString() ? `/candidate/jobs?${params.toString()}` : "/candidate/jobs",
      { scroll: false }
    )
  }, [date, workMode, workType, department])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFilterClick = (value: string) => {
    setSelectedFilter(value)
    if (!isFilterOpen) setIsFilterOpen(true)
  }

  const handleClearFilters = () => {
    setIsFilterOpen(false)
    setDate(null)
    setWorkMode(null)
    setWorkType([])
    setDepartment([])
  }


  const DEPARTMENT_OPTIONS =
    departmentres?.data?.map(dep => ({
      label: dep.department, // UI ke liye
      value: dep._id,  // ID (state + URL)
    })) || []


  const activeFiltersCount = (date ? 1 : 0) + (workMode ? 1 : 0) + workType.length + department.length

  return (
    <>
      <div
        className={`md:hidden ${isScrolled ? 'fixed left-0 right-0 z-40 bg-[#fbfbfb] px-3 py-2' : 'px-3 py-2'}`}
        style={{ ...(isScrolled ? { top: '170px' } : { marginTop: '-1px' }), transition: 'all 200ms' }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm relative"
          >
            <Filter className="h-4 w-4 text-gray-700" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-semibold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterClick(option.value)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium shrink-0 h-10 border transition-colors ${(option.value === 'date' && date) || (option.value === 'workMode' && workMode) || (option.value === 'workType' && workType.length > 0) || (option.value === 'department' && department.length > 0)
                  ? "bg-[#f0f9ff] text-[#0ea5e9] border-[#0ea5e9]"
                  : "bg-white text-gray-700 border-gray-200"
                  }`}
              >
                <option.icon className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="bottom" className="h-[70vh] md:hidden p-0 flex flex-col rounded-t-2xl">
          <SheetHeader className="p-4 border-b border-gray-200 relative">
            <SheetTitle className="text-base font-semibold">Filters</SheetTitle>
            <button onClick={() => setIsFilterOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <X className="h-4 w-4 text-white" />
            </button>
          </SheetHeader>

          <div className="flex-1 flex overflow-hidden">
            <div className="w-2/5 border-r border-gray-200 bg-gray-50 overflow-y-auto">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`w-full flex items-center gap-2 px-3 py-4 text-left border-l-[3px] text-sm ${selectedFilter === option.value ? "bg-white text-[#2dd4bf] border-l-[#2dd4bf] font-medium" : "text-gray-700 border-l-transparent"
                    }`}
                >
                  <option.icon className="h-4 w-4" />
                  {option.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto bg-white p-4">
              {selectedFilter === "date" && (
                <div className="space-y-2">
                  {DATE_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => setDate(opt.value)} className={`w-full flex items-center justify-between p-3 rounded-lg text-sm ${date === opt.value ? "bg-[#f0f9ff]" : ""}`}>
                      {opt.label} {date === opt.value && <Check className="h-4 w-4 text-[#2dd4bf]" />}
                    </button>
                  ))}
                </div>
              )}

              {selectedFilter === "workMode" && (
                <div className="space-y-2">
                  {WORK_MODE_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => setWorkMode(opt.value)} className={`w-full flex items-center justify-between p-3 rounded-lg text-sm ${workMode === opt.value ? "bg-[#f0f9ff]" : ""}`}>
                      {opt.label} {workMode === opt.value && <Check className="h-4 w-4 text-[#2dd4bf]" />}
                    </button>
                  ))}
                </div>
              )}

              {selectedFilter === "workType" && (
                <div className="space-y-2">
                  {WORK_TYPE_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => toggleMultiValue(opt.value, workType, setWorkType)} className={`w-full flex items-center justify-between p-3 rounded-lg text-sm ${workType.includes(opt.value) ? "bg-[#f0f9ff]" : ""}`}>
                      {opt.label} {workType.includes(opt.value) && <Check className="h-4 w-4 text-[#2dd4bf]" />}
                    </button>
                  ))}
                </div>
              )}

              {selectedFilter === "department" && (
                <div className="space-y-2">
                  {DEPARTMENT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        toggleMultiValue(opt.value, department, setDepartment)
                      }
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm ${department.includes(opt.value) ? "bg-[#f0f9ff]" : ""
                        }`}
                    >
                      {opt.label}
                      {department.includes(opt.value) && (
                        <Check className="h-4 w-4 text-[#2dd4bf]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white border-t border-gray-200">
            <button onClick={handleClearFilters} className="flex-1 py-3 text-sm font-medium text-[#2dd4bf]">Clear Filters</button>
            <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-3 text-sm font-semibold text-white bg-[#2dd4bf] rounded-lg">Apply</button>
          </div>
        </SheetContent>
      </Sheet>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #94a3b8 #f1f5f9;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #2dd4bf;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #2dd4bf;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  )
}