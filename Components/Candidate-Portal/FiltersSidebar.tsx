import { Search, Filter, X } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion"
import { useSearchParams, useRouter } from "next/navigation"
import { departmentApiResponse } from "@/types/types"

export default function FiltersSidebar({ departmentres }: { departmentres: departmentApiResponse }) {
  const [date, setDatePosted] = useState<string | null>(null)
  const [workMode, setWorkMode] = useState<string | null>(null)
  const [workType, setWorkType] = useState<string[]>([])
  const [department, setDepartment] = useState<string[]>([])

  const router = useRouter()
  const searchParams = useSearchParams()

  console.log(departmentres?.data);


  const toggleMultiValue = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
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
      params.toString()
        ? `/candidate/jobs?${params.toString()}`
        : "/candidate/jobs",
      { scroll: false }
    )
  }, [date, workMode, workType, department])
  const clearAll = () => {
    setDatePosted(null)
    setWorkMode(null)
    setWorkType([])
    setDepartment([])

  }

  const hasFilters = date || workMode || workType.length || department.length

  const SelectedChip = ({
    label,
    onRemove,
  }: {
    label: string
    onRemove: () => void
  }) => (
    <div className="flex items-center gap-1 px-3 py-1 bg-[#f0f9ff] text-[#0ea5e9] rounded-full text-xs">
      {label}
      <button onClick={onRemove}>
        <X className="h-3 w-3 cursor-pointer" />
      </button>
    </div>
  )

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

  const DEPARTMENT_OPTIONS =
    departmentres?.data?.map(dep => ({
      label: dep.department,
      value: dep._id
    })) || []



  return (
    <div className="w-full md:w-72 lg:w-80 bg-white rounded-lg border border-gray-200 p-4 md:p-6 h-fit">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </h3>

        {hasFilters ?
          <button
            onClick={clearAll}
            className="text-xs text-[#0ea5e9] font-medium cursor-pointer"
          >
            Clear
          </button> : ""
        }
      </div>

      {/* Selected Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {date &&
          DATE_OPTIONS.filter(d => d.value === date).map(d => (
            <SelectedChip
              key={d.value}
              label={d.label}
              onRemove={() => setDatePosted(null)}
            />
          ))}

        {workMode && (() => {
          const item = WORK_MODE_OPTIONS.find(o => o.value === workMode)
          return (
            <SelectedChip
              label={item?.label || workMode}
              onRemove={() => setWorkMode(null)}
            />
          )
        })()}

        {workType.map(v => {
          const item = WORK_TYPE_OPTIONS.find(o => o.value === v)
          return (
            <SelectedChip
              key={v}
              label={item?.label || v}
              onRemove={() => toggleMultiValue(v, setWorkType)}
            />
          )
        })}
        {department.map(id => {
          const item = DEPARTMENT_OPTIONS.find(o => o.value === id)
          return (
            <SelectedChip
              key={id}
              label={item?.label || "Department"}
              onRemove={() => toggleMultiValue(id, setDepartment)}
            />
          )
        })}
      </div>

      {/* Accordion */}
      <Accordion
        type="multiple"
        defaultValue={["date", "workMode", "workType", "department"]}
      >

        {/* DATE */}
        <AccordionItem value="date">
          <AccordionTrigger className="no-underline hover:no-underline">
            Date posted
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {DATE_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={date === opt.value}
                  onChange={() => setDatePosted(opt.value)}
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* WORK MODE */}
        <AccordionItem value="workMode">
          <AccordionTrigger className="no-underline hover:no-underline">
            Work Mode
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {WORK_MODE_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="workMode"
                  value={opt.value}
                  checked={workMode === opt.value}
                  onChange={(e) => setWorkMode(e.target.value)}
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* WORK TYPE */}
        <AccordionItem value="workType">
          <AccordionTrigger className="no-underline hover:no-underline">
            Work Type
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {WORK_TYPE_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={workType.includes(opt.value)}
                  onChange={() => toggleMultiValue(opt.value, setWorkType)}
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* DEPARTMENT */}
        <AccordionItem value="department">
          <AccordionTrigger className="no-underline hover:no-underline">
            Department
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-2">

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="block w-[95%] mx-auto pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none  focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
              />
            </div>
            {DEPARTMENT_OPTIONS.map(opt => (
              <label key={opt.value} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={department.includes(opt.value)} // opt.value = _id
                  onChange={() =>
                    toggleMultiValue(opt.value, setDepartment)
                  }
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
