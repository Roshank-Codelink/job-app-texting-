"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, X, Search, Filter, Check } from "lucide-react"

interface FiltersSidebarProps {
  activeFilters: string[]
  onRemoveFilter: (filter: string) => void
  onClearAll: () => void
  datePosted: string
  onDatePostedChange: (value: string) => void
  salaryRange: number
  onSalaryRangeChange: (value: number) => void
  workMode: string[]
  onWorkModeChange: (value: string) => void
  workType: string[]
  onWorkTypeChange: (value: string) => void
  categories: string[]
  onCategoryChange: (value: string) => void
}

export default function FiltersSidebar({
  activeFilters,
  onRemoveFilter,
  onClearAll,
  datePosted,
  onDatePostedChange,
  salaryRange,
  onSalaryRangeChange,
  workMode,
  onWorkModeChange,
  workType,
  onWorkTypeChange,
  categories,
  onCategoryChange,
}: FiltersSidebarProps) {
  const [isDateOpen, setIsDateOpen] = React.useState(true)
  const [isSalaryOpen, setIsSalaryOpen] = React.useState(true)
  const [isWorkModeOpen, setIsWorkModeOpen] = React.useState(true)
  const [isWorkTypeOpen, setIsWorkTypeOpen] = React.useState(true)
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(true)
  const [categorySearch, setCategorySearch] = React.useState("")

  const formatSalary = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} Lakhs`
    }
    return `₹${value.toLocaleString('en-IN')}`
  }

  return (
    <div className="w-full md:w-72 lg:w-80 bg-white rounded-lg border border-gray-200 p-4 md:p-6 h-fit">
      {/* Active Filters Section - Always Visible */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </h3>
          {activeFilters.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-[#0ea5e9] hover:text-[#0284c7] font-medium"
            >
              Clear all
            </button>
          )}
        </div>
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <div
                key={filter}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f9ff] text-[#0ea5e9] rounded-full text-xs font-medium"
              >
                <span>{filter}</span>
                <button
                  onClick={() => onRemoveFilter(filter)}
                  className="hover:bg-[#e0f2fe] rounded-full p-0.5 transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Date Posted Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsDateOpen(!isDateOpen)}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-sm font-semibold text-gray-900">Date posted</h3>
          {isDateOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500 cursor-pointer" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500 cursor-pointer" />
          )}
        </button>
        {isDateOpen && (
          <div className="space-y-2">
            {[
              { label: "All", value: "all" },
              { label: "Last 24 hours", value: "24h" },
              { label: "Last 3 days", value: "3d" },
              { label: "Last 7 days", value: "7d" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="datePosted"
                  value={option.value}
                  checked={datePosted === option.value}
                  onChange={(e) => onDatePostedChange(e.target.value)}
                  className="w-4 h-4 text-[#0ea5e9] border-gray-300 focus:outline-none focus:ring-0"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Salary Section */}
      {/* <div className="mb-6">
        <button
          onClick={() => setIsSalaryOpen(!isSalaryOpen)}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-sm font-semibold text-gray-900">Salary</h3>
          {isSalaryOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500 cursor-pointer" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500 cursor-pointer" />
          )}
        </button>
        {isSalaryOpen && (
          <div className="space-y-2">
            {[
              { label: "₹0 - ₹25,000", value: 0 },
              { label: "₹25,000 - ₹50,000", value: 25000 },
              { label: "₹50,000 - ₹75,000", value: 50000 },
              { label: "₹75,000 - ₹1 Lakh", value: 75000 },
              { label: "₹1 Lakh - ₹1.5 Lakhs", value: 100000 },
              { label: "₹1.5 Lakhs+", value: 150000 },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={salaryRange === option.value}
                  onChange={() => {
                    if (salaryRange === option.value) {
                      onSalaryRangeChange(0)
                    } else {
                      onSalaryRangeChange(option.value)
                    }
                  }}
                  className="w-4 h-4 text-[#0ea5e9] border-gray-300 rounded focus:outline-none focus:ring-0"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div> */}

      {/* Work Mode Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsWorkModeOpen(!isWorkModeOpen)}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-sm font-semibold text-gray-900">
            Work Mode ({workMode.length})
          </h3>
          {isWorkModeOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500 cursor-pointer" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500 cursor-pointer" />
          )}
        </button>
        {isWorkModeOpen && (
          <div className="space-y-2">
            {[
              { label: "Work from home", value: "work_from_home" },
              { label: "Work from office", value: "work_from_office" }
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={workMode.includes(option.value)}
                  onChange={() => onWorkModeChange(option.value)}
                  className="w-4 h-4 text-[#0ea5e9] border-gray-300 rounded focus:outline-none focus:ring-0"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Work Type Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsWorkTypeOpen(!isWorkTypeOpen)}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-sm font-semibold text-gray-900">Work Type</h3>
          {isWorkTypeOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500 cursor-pointer" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500 cursor-pointer" />
          )}
        </button>
        {isWorkTypeOpen && (
          <div className="space-y-2">
            {[
              { label: "Full time", value: "full_time" },
              { label: "Part time", value: "part_time" },
              { label: "Contract", value: "contract" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={workType.includes(option.value)}
                  onChange={() => onWorkTypeChange(option.value)}
                  className="w-4 h-4 text-[#0ea5e9] border-gray-300 rounded focus:outline-none focus:ring-0"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full flex items-center justify-between mb-3"
        >
          <h3 className="text-sm font-semibold text-gray-900">
            Department ({categories.length})
          </h3>
          {isCategoryOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500 cursor-pointer" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500 cursor-pointer" />
          )}
        </button>
        {isCategoryOpen && (
          <div className="space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent"
              />
            </div>
            {/* Category Checkboxes */}
            <div className="space-y-2">
              {[
                { label: "IT / Software", value: "it_software" },
                { label: "Marketing / Sales", value: "marketing_sales" },
                { label: "Design / Creative", value: "design_creative" },
                { label: "Finance / Accounting", value: "finance_accounting" },
                { label: "HR / Recruitment", value: "hr_recruitment" },
                { label: "Operations / Management", value: "operations_management" },
                { label: "Customer Service", value: "customer_service" },
                { label: "Education / Training", value: "education_training" },
              ]
                .filter((cat) =>
                  cat.label.toLowerCase().includes(categorySearch.toLowerCase())
                )
                .map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={categories.includes(option.value)}
                      onChange={() => onCategoryChange(option.value)}
                      className="w-4 h-4 text-[#0ea5e9] border-gray-300 rounded focus:outline-none focus:ring-0"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {option.label}
                    </span>
                  </label>
                ))}
            </div>
            {/* Show More Link */}
            {/* <button className="text-sm text-[#14b8a6] hover:text-[#0d9488] font-medium">
              Show 12 more &gt;
            </button> */}
          </div>
        )}
      </div>

      <style jsx>{`
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
    </div>
  )
}

