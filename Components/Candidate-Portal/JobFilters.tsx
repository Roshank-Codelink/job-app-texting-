"use client"

import * as React from "react"
import { Filter, ChevronDown, X, Search, Check, Calendar, DollarSign, Home, Briefcase, Clock, Building2, ArrowUpDown } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/Components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

const filterOptions = [
  { label: "Date posted", value: "date", icon: Calendar },
  { label: "Salary", value: "salary", icon: DollarSign },
  { label: "Work mode", value: "workMode", icon: Home },
  { label: "Work type", value: "workType", icon: Briefcase },
  { label: "Work shift", value: "workShift", icon: Clock },
  { label: "Department", value: "department", icon: Building2 },
  { label: "Sort by", value: "sortBy", icon: ArrowUpDown },
]

export default function JobFilters() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)
  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(null)
  const [activeFilters, setActiveFilters] = React.useState<string[]>(["Work from home"])
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Filter states
  const [datePosted, setDatePosted] = React.useState("all")
  const [salaryRange, setSalaryRange] = React.useState(0)
  const [workMode, setWorkMode] = React.useState<string[]>(["work_from_home"])
  const [workType, setWorkType] = React.useState<string[]>([])
  const [workShift, setWorkShift] = React.useState<string[]>([])
  const [department, setDepartment] = React.useState<string[]>([])
  const [sortBy, setSortBy] = React.useState("relevant")
  const [categories, setCategories] = React.useState<string[]>([])
  const [categorySearch, setCategorySearch] = React.useState("")

  const formatSalary = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} Lakhs`
    }
    return `₹${value.toLocaleString('en-IN')}`
  }

  // Scroll detection for sticky filters - mobile only
  React.useEffect(() => {
    let ticking = false
    let lastScrollY = 0
    let lastIsScrolled = false

    const checkIsMobile = () => window.innerWidth < 768 // md breakpoint

    const handleScroll = () => {
      // Only process scroll on mobile devices
      if (!checkIsMobile()) {
        if (lastIsScrolled) {
          setIsScrolled(false)
          lastIsScrolled = false
        }
        return
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const shouldBeScrolled = scrollY > 30

          // Only update state if it actually changed to prevent unnecessary re-renders
          if (shouldBeScrolled !== lastIsScrolled) {
            setIsScrolled(shouldBeScrolled)
            lastIsScrolled = shouldBeScrolled
          }

          lastScrollY = scrollY
          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      // Reset scroll state when resizing to desktop/tablet
      if (!checkIsMobile()) {
        if (lastIsScrolled) {
          setIsScrolled(false)
          lastIsScrolled = false
        }
      }
    }

    // Check initial state
    if (checkIsMobile()) {
      const initialScrollY = window.scrollY
      const initialIsScrolled = initialScrollY > 30
      setIsScrolled(initialIsScrolled)
      lastIsScrolled = initialIsScrolled
      lastScrollY = initialScrollY
    } else {
      setIsScrolled(false)
      lastIsScrolled = false
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Disable body scroll when sidebar is open
  React.useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isFilterOpen])

  // Console log active filters
  React.useEffect(() => {
    console.log("Selected Filters:", activeFilters)
  }, [activeFilters])

  const handleFilterClick = (value: string) => {
    // Set selected filter and open sidebar if not already open
    setSelectedFilter(value)
    if (!isFilterOpen) {
      setIsFilterOpen(true)
    }
  }

  // Set default selected filter when sheet opens
  React.useEffect(() => {
    if (isFilterOpen && !selectedFilter) {
      setSelectedFilter("sortBy")
    }
  }, [isFilterOpen, selectedFilter])

  const handleCloseFilter = () => {
    setIsFilterOpen(false)
    setSelectedFilter(null)
  }

  const handleClearFilters = () => {
    setActiveFilters([])
    setDatePosted("all")
    setSalaryRange(0)
    setWorkMode([])
    setWorkType([])
    setWorkShift([])
    setDepartment([])
    setSortBy("relevant")
    setCategories([])
    handleCloseFilter()
  }

  const handleSortByChange = (value: string) => {
    setSortBy(value)
    const filtered = activeFilters.filter(f => !f.startsWith("Sort: "))
    if (value !== "relevant") {
      const sortLabels: { [key: string]: string } = {
        "relevant": "Sort: Relevant",
        "date_new": "Sort: Date posted - New to Old",
        "salary_high": "Sort: Salary - High to low",
        "distance_near": "Sort: Distance - Near to far",
      }
      const sortLabel = sortLabels[value]
      if (sortLabel) {
        setActiveFilters([...filtered, sortLabel])
      } else {
        setActiveFilters(filtered)
      }
    } else {
      setActiveFilters(filtered)
    }
  }

  const handleApply = () => {
    handleCloseFilter()
  }

  const handleDatePostedChange = (value: string) => {
    setDatePosted(value)
    const filtered = activeFilters.filter(f => !f.startsWith("Date: "))
    if (value !== "all") {
      const dateLabels: { [key: string]: string } = {
        "24h": "Date: Last 24 hours",
        "3d": "Date: Last 3 days",
        "7d": "Date: Last 7 days"
      }
      const dateLabel = dateLabels[value]
      if (dateLabel) {
        setActiveFilters([...filtered, dateLabel])
      } else {
        setActiveFilters(filtered)
      }
    } else {
      setActiveFilters(filtered)
    }
  }

  const handleSalaryRangeChange = (value: number) => {
    setSalaryRange(value)
    const filtered = activeFilters.filter(f => !f.startsWith("Salary: "))
    if (value > 0) {
      const salaryLabel = formatSalary(value)
      setActiveFilters([...filtered, salaryLabel])
    } else {
      setActiveFilters(filtered)
    }
  }

  const handleWorkModeChange = (value: string) => {
    if (workMode.includes(value)) {
      setWorkMode(workMode.filter((m) => m !== value))
      const filterLabel = value === "work_from_home" ? "Work from home" :
        value === "work_from_office" ? "Work from office" :
          "Work from field"
      setActiveFilters(activeFilters.filter((f) => f !== filterLabel))
    } else {
      setWorkMode([...workMode, value])
      const filterLabel = value === "work_from_home" ? "Work from home" :
        value === "work_from_office" ? "Work from office" :
          "Work from field"
      if (!activeFilters.includes(filterLabel)) {
        setActiveFilters([...activeFilters, filterLabel])
      }
    }
  }

  const handleWorkTypeChange = (value: string) => {
    if (workType.includes(value)) {
      setWorkType(workType.filter((t) => t !== value))
      const filterLabel = value === "full_time" ? "Full time" :
        value === "part_time" ? "Part time" :
          "Contract"
      setActiveFilters(activeFilters.filter((f) => f !== filterLabel))
    } else {
      setWorkType([...workType, value])
      const filterLabel = value === "full_time" ? "Full time" :
        value === "part_time" ? "Part time" :
          "Contract"
      if (!activeFilters.includes(filterLabel)) {
        setActiveFilters([...activeFilters, filterLabel])
      }
    }
  }

  const handleCategoryChange = (value: string) => {
    const categoryLabels: { [key: string]: string } = {
      "it_software": "IT / Software",
      "marketing_sales": "Marketing / Sales",
      "design_creative": "Design / Creative",
      "finance_accounting": "Finance / Accounting",
      "hr_recruitment": "HR / Recruitment",
      "operations_management": "Operations / Management",
      "customer_service": "Customer Service",
      "education_training": "Education / Training",
    }
    const categoryLabel = categoryLabels[value] || value

    if (categories.includes(value)) {
      setCategories(categories.filter((c) => c !== value))
      setActiveFilters(activeFilters.filter((f) => f !== categoryLabel))
    } else {
      setCategories([...categories, value])
      if (!activeFilters.includes(categoryLabel)) {
        setActiveFilters([...activeFilters, categoryLabel])
      }
    }
  }

  return (
    <>
      {/* Filter Buttons - Mobile Only */}
      <div
        className={`md:hidden ${isScrolled ? 'fixed left-0 right-0 z-40 bg-[#fbfbfb] px-3 py-2 sm:px-4 sm:py-2.5' : 'px-3 py-2 sm:px-4 sm:py-2.5'}`}
        style={{
          ...(isScrolled ? { top: '170px', marginTop: '0', paddingTop: '8px' } : { marginTop: '-1px' }),
          transition: 'background-color 200ms ease-out, padding 200ms ease-out',
          willChange: isScrolled ? 'transform' : 'auto'
        }}
      >
        <div className="flex items-center gap-2">
          {/* Filter Icon - Non-scrollable */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm hover:bg-gray-50 transition-colors relative"
          >
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            {activeFilters.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold">
                {activeFilters.length}
              </span>
            )}
          </button>

          {/* Filter Buttons - Scrollable */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1">
            {filterOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <button
                  key={option.value}
                  onClick={() => handleFilterClick(option.value)}
                  className={`flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium shrink-0 transition-colors h-10 sm:h-11 ${activeFilters.includes(option.value)
                      ? "bg-[#f0f9ff] text-[#0ea5e9] border border-[#0ea5e9]"
                      : "bg-white text-gray-700 border border-gray-200"
                    }`}
                >
                  <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="whitespace-nowrap">{option.label}</span>
                  {option.value === "workMode" && workMode.length > 0 && (
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center text-[10px] sm:text-xs font-semibold">
                      {workMode.length}
                    </span>
                  )}
                  {option.value === "category" && categories.length > 0 && (
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center text-[10px] sm:text-xs font-semibold">
                      {categories.length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filter Sidebar - Bottom Sheet using Shadcn Sheet */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="bottom" className="h-[70vh] md:hidden p-0 flex flex-col rounded-t-2xl transition-all duration-300 ease-in-out">
          <SheetHeader className="p-3 sm:p-4 border-b border-gray-200 relative">
            <SheetTitle className="text-base sm:text-lg font-semibold text-gray-900">Filters</SheetTitle>
            <button
              onClick={handleCloseFilter}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors z-10"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </SheetHeader>

          {/* Dual Pane Layout */}
          <div className="flex-1 flex overflow-hidden flex-col">
            <div className="flex-1 flex overflow-hidden">
              {/* Left Pane - Filter Categories */}
              <div className="w-2/5 border-r border-gray-200 overflow-y-auto custom-scrollbar bg-gray-50">
                <div className="flex flex-col">
                  {filterOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleFilterClick(option.value)}
                        className={`flex items-center justify-between px-3 py-3 text-left transition-colors border-l-[3px] ${selectedFilter === option.value
                            ? "bg-white text-[#2dd4bf] border-l-[#2dd4bf] font-medium"
                            : "text-gray-700 hover:bg-gray-100 border-l-transparent"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4 shrink-0" />
                          <span className="text-sm">{option.label}</span>
                        </div>
                        {option.value === "workMode" && workMode.length > 0 && (
                          <span className="w-5 h-5 rounded-full bg-[#2dd4bf] text-white flex items-center justify-center text-xs font-semibold">
                            {workMode.length}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right Pane - Filter Options */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-4">
                {selectedFilter === "date" && (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleDatePostedChange("all")}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${datePosted === "all" ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                        }`}
                    >
                      <span className="text-sm text-gray-700">All</span>
                      {datePosted === "all" && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                    </button>
                    <button
                      onClick={() => handleDatePostedChange("24h")}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${datePosted === "24h" ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                        }`}
                    >
                      <span className="text-sm text-gray-700">Last 24 hours</span>
                      {datePosted === "24h" && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                    </button>
                    <button
                      onClick={() => handleDatePostedChange("3d")}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${datePosted === "3d" ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                        }`}
                    >
                      <span className="text-sm text-gray-700">Last 3 days</span>
                      {datePosted === "3d" && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                    </button>
                    <button
                      onClick={() => handleDatePostedChange("7d")}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${datePosted === "7d" ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                        }`}
                    >
                      <span className="text-sm text-gray-700">Last 7 days</span>
                      {datePosted === "7d" && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                    </button>
                  </div>
                )}

                {/* {selectedFilter === "salary" && (
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
                            handleSalaryRangeChange(0)
                          } else {
                            handleSalaryRangeChange(option.value)
                          }
                        }}
                        className="w-4 h-4 text-[#0ea5e9] border-gray-300 rounded focus:outline-none focus:ring-0"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )} */}

                {selectedFilter === "workMode" && (
                  <div className="space-y-2">
                    {[
                      { value: "work_from_home", label: "Work from home" },
                      { value: "work_from_office", label: "Work from office" },
                      { value: "work_from_field", label: "Work from field" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleWorkModeChange(option.value)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${workMode.includes(option.value) ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                          }`}
                      >
                        <span className="text-sm text-gray-700">{option.label}</span>
                        {workMode.includes(option.value) && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                      </button>
                    ))}
                  </div>
                )}

                {selectedFilter === "workType" && (
                  <div className="space-y-2">
                    {[
                      { value: "full_time", label: "Full time" },
                      { value: "part_time", label: "Part time" },
                      { value: "contract", label: "Contract" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleWorkTypeChange(option.value)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${workType.includes(option.value) ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                          }`}
                      >
                        <span className="text-sm text-gray-700">{option.label}</span>
                        {workType.includes(option.value) && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                      </button>
                    ))}
                  </div>
                )}

                {selectedFilter === "workShift" && (
                  <div className="space-y-2">
                    {[
                      { value: "day", label: "Day shift" },
                      { value: "night", label: "Night shift" },
                      { value: "flexible", label: "Flexible" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          if (workShift.includes(option.value)) {
                            setWorkShift(workShift.filter((s) => s !== option.value))
                          } else {
                            setWorkShift([...workShift, option.value])
                          }
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${workShift.includes(option.value) ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                          }`}
                      >
                        <span className="text-sm text-gray-700">{option.label}</span>
                        {workShift.includes(option.value) && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                      </button>
                    ))}
                  </div>
                )}

                {selectedFilter === "department" && (
                  <div className="space-y-2">
                    {[
                      { value: "engineering", label: "Engineering" },
                      { value: "sales", label: "Sales" },
                      { value: "marketing", label: "Marketing" },
                      { value: "hr", label: "HR" },
                      { value: "finance", label: "Finance" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          if (department.includes(option.value)) {
                            setDepartment(department.filter((d) => d !== option.value))
                          } else {
                            setDepartment([...department, option.value])
                          }
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${department.includes(option.value) ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                          }`}
                      >
                        <span className="text-sm text-gray-700">{option.label}</span>
                        {department.includes(option.value) && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                      </button>
                    ))}
                  </div>
                )}

                {selectedFilter === "sortBy" && (
                  <div className="space-y-2">
                    {[
                      { value: "relevant", label: "Relevant" },
                      { value: "date_new", label: "Date posted - New to Old" },
                      { value: "salary_high", label: "Salary - High to low" },
                      { value: "distance_near", label: "Distance - Near to far" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortByChange(option.value)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${sortBy === option.value ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                          }`}
                      >
                        <span className="text-sm text-gray-700">{option.label}</span>
                        {sortBy === option.value && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                      </button>
                    ))}
                  </div>
                )}

                {selectedFilter === "category" && (
                  <div className="space-y-3">
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
                        .map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => handleCategoryChange(cat.value)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${categories.includes(cat.value) ? "bg-[#f0f9ff]" : "hover:bg-gray-50"
                              }`}
                          >
                            <span className="text-sm text-gray-700">{cat.label}</span>
                            {categories.includes(cat.value) && <Check className="h-5 w-5 text-[#2dd4bf]" />}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {!selectedFilter && (
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                    Select a filter category
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Active Filters - Always Visible at Bottom */}
          {activeFilters.length > 0 && (
            <div className="px-4 py-3 bg-[#f0fdf4] border-t border-gray-200 shrink-0">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <div
                    key={filter}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 rounded-full text-xs border border-gray-200"
                  >
                    <span>{filter}</span>
                    <button
                      onClick={() => {
                        const filtered = activeFilters.filter((f) => f !== filter)
                        setActiveFilters(filtered)
                        // Also update the corresponding state
                        if (filter === "Work from home") {
                          setWorkMode(workMode.filter((m) => m !== "work_from_home"))
                        } else if (filter === "Work from office") {
                          setWorkMode(workMode.filter((m) => m !== "work_from_office"))
                        } else if (filter === "Work from field") {
                          setWorkMode(workMode.filter((m) => m !== "work_from_field"))
                        } else if (filter.startsWith("Salary: ")) {
                          setSalaryRange(0)
                        } else if (filter.startsWith("Date: ")) {
                          setDatePosted("all")
                        } else if (filter.startsWith("Sort: ")) {
                          setSortBy("relevant")
                        } else if (filter === "Full time") {
                          setWorkType(workType.filter((t) => t !== "full_time"))
                        } else if (filter === "Part time") {
                          setWorkType(workType.filter((t) => t !== "part_time"))
                        } else if (filter === "Contract") {
                          setWorkType(workType.filter((t) => t !== "contract"))
                        } else {
                          // Handle category removal
                          const categoryMap: { [key: string]: string } = {
                            "IT / Software": "it_software",
                            "Marketing / Sales": "marketing_sales",
                            "Design / Creative": "design_creative",
                            "Finance / Accounting": "finance_accounting",
                            "HR / Recruitment": "hr_recruitment",
                            "Operations / Management": "operations_management",
                            "Customer Service": "customer_service",
                            "Education / Training": "education_training",
                          }
                          const categoryValue = categoryMap[filter]
                          if (categoryValue) {
                            setCategories(categories.filter((c) => c !== categoryValue))
                          }
                        }
                      }}
                      className="hover:bg-gray-100 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Buttons - Always Visible */}
          <div className="flex items-center gap-3 p-4 bg-white shrink-0 border-t border-gray-200">
            <button
              onClick={handleClearFilters}
              className="flex-1 px-4 py-3 text-sm font-medium text-[#2dd4bf] hover:bg-gray-50 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-[#2dd4bf] hover:bg-[#14b8a6] rounded-lg transition-all shadow-sm"
            >
              Apply
            </button>
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

