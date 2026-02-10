import { Search, Filter, X } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion"
import { departmentApiResponse } from "@/types/types"
import { useJobFilters } from "@/hooks/useJobFilters"

export default function FiltersSidebar({ departmentres }: { departmentres: departmentApiResponse }) {
  const {
    date, setDate,
    workMode, setWorkMode,
    workType, toggleWorkType,
    department, toggleDepartment,
    clearAllFilters,
    hasFilters
  } = useJobFilters()


  const SelectedChip = ({
    label,
    onRemove,
  }: {
    label: string
    onRemove: () => void
  }) => (
    <div className="flex items-center gap-1 px-3 py-1 bg-(--navbar-bg-button) text-(--navbar-text-color) rounded-full text-xs">
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
    <div className="w-full md:w-72 lg:w-80 bg-white rounded-lg border border-(--profile-image-border-color) p-4 md:p-6 h-fit">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-(--filter-header-text-color) flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </h3>

        {hasFilters ?
          <button
            onClick={clearAllFilters}
            className="text-xs text-(--navbar-text-color) font-medium cursor-pointer"
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
              onRemove={() => setDate(null)}
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
              onRemove={() => toggleWorkType(v)}
            />
          )
        })}
        {department.map(id => {
          const item = DEPARTMENT_OPTIONS.find(o => o.value === id)
          return (
            <SelectedChip
              key={id}
              label={item?.label || "Department"}
              onRemove={() => toggleDepartment(id)}
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
          <AccordionContent className="space-y-2 pt-2 pl-2">
            {DATE_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={date === opt.value}
                  onChange={() => setDate(opt.value)}
                  className="scale-125"
                />
                <span className="text-sm text-(--profile-menu-text-color)">{opt.label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* WORK MODE */}
        <AccordionItem value="workMode">
          <AccordionTrigger className="no-underline hover:no-underline">
            Work Mode
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 pl-2">
            {WORK_MODE_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="workMode"
                  value={opt.value}
                  checked={workMode === opt.value}
                  onChange={(e) => setWorkMode(e.target.value)}
                  className="scale-125"
                />
                <span className="text-sm text-(--profile-menu-text-color)">{opt.label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* WORK TYPE */}
        <AccordionItem value="workType">
          <AccordionTrigger className="no-underline hover:no-underline">
            Work Type
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 pl-2">
            {WORK_TYPE_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={workType.includes(opt.value)}
                  onChange={() => toggleWorkType(opt.value)}
                  className="scale-125"
                />
                <span className="text-sm text-(--profile-menu-text-color)">{opt.label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* DEPARTMENT */}
        <AccordionItem value="department">
          <AccordionTrigger className="no-underline hover:no-underline">
            Department
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-2 pl-2">

            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-(--job-post-bg-color)" />
              <input
                type="text"
                placeholder="Search"
                className="block w-[99%] mx-auto pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none  focus:outline-none focus:ring-2 focus:ring-(--navbar-text-color) focus:border-transparent"
              />
            </div> */}
            {DEPARTMENT_OPTIONS.map(opt => (
              <label key={opt.value} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={department.includes(opt.value)}
                  onChange={() =>
                    toggleDepartment(opt.value)
                  }
                  className="scale-125"
                />
                <span className="text-sm text-(--profile-menu-text-color)">{opt.label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
