"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { FileQuestion, ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
    const { data: session } = useSession()
    const role = ((session?.user as any)?.role || "").toUpperCase()

    // Determine redirect path based on role
    const getHomePath = () => {
        if (role === "EMPLOYEE") return "/candidate/jobs"
        if (role === "EMPLOYER") return "/employer/dashboard"
        return "/"
    }   

    const homePath = getHomePath()

    return (
        <div className="min-h-screen bg-(--Profile-hover-bg) flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Icon Container */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-2xl bg-white shadow-sm border border-(--profile-image-border-color) flex items-center justify-center transform rotate-12 transition-transform hover:rotate-0 duration-300">
                            <FileQuestion className="h-12 w-12 text-(--navbar-text-color)" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-lg bg-(--job-post-button-bg-to) flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-xs">404</span>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-3xl font-bold text-(--filter-header-text-color) mb-3">
                    Oops! Page Not Found
                </h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href={homePath}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) 
                                 text-white font-semibold rounded-xl shadow-sm hover:shadow-md 
                                 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {role === "EMPLOYEE" ? (
                            <>
                                <BriefcaseIcon />
                                Back to Jobs
                            </>
                        ) : role === "EMPLOYER" ? (
                            <>
                                <Home className="h-4 w-4" />
                                Dashboard
                            </>
                        ) : (
                            <>
                                <Home className="h-4 w-4" />
                                Go to Home
                            </>
                        )}
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-(--profile-image-border-color)
                                 text-(--profile-menu-text-color) font-semibold rounded-xl shadow-sm hover:bg-gray-50
                                 transition-all duration-200"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Previous Page
                    </button>
                </div>

                {/* Branding Footer */}
                <div className="mt-12 text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Jobito. All rights reserved.
                </div>
            </div>
        </div>
    )
}

function BriefcaseIcon() {
    return (
        <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    )
}
