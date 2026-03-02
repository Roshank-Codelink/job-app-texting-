"use client";
import { useState } from "react";
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { User, Settings, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { LogoutAPI } from "@/api_config/shared/sharedapi";
import { signOut } from "next-auth/react";

interface UserProfileProps {
    name?: string;
    title?: string;
    imageUrl?: string;
    variant?: "navbar" | "sidebar";
    user?: any;
}

export default function UserProfiles({
    imageUrl,
    variant = "navbar",
    user,
}: UserProfileProps) {
    const [open, setOpen] = useState(false);

    // Get initials from name
    const getInitials = (fullName?: string) => {
        if (!fullName) return "";
        return fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleLogout = async () => {
        const response = await LogoutAPI();
        signOut(
            {
                redirect: true,
                callbackUrl: "/employer-signin",
            }
        );
    }

    const isSidebar = variant === "sidebar";

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className={cn(
                    "flex items-center cursor-pointer relative transition-all outline-none",
                    isSidebar
                        ? "px-3 py-2.5 rounded-lg hover:bg-(--Profile-hover-bg) w-full"
                        : "gap-2 px-2 py-1 rounded-full border border-slate-200 bg-white hover:shadow-sm"
                )}>
                    {/* Profile Picture */}
                    <div className={cn(
                        "relative shrink-0 overflow-hidden",
                        isSidebar ? "w-10 h-10 rounded-lg" : "w-8 h-8 rounded-full"
                    )}>
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={user?.name || ""}
                                width={80}
                                height={80}
                                sizes="40px"
                                className="w-full h-full object-cover"
                                unoptimized={imageUrl.startsWith("http")}
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-(--profile-liner-from-color) to-(--profile-liner-to-color) flex items-center justify-center">
                                <span className={cn(
                                    "text-(--navbar-bg-parent) font-semibold",
                                    isSidebar ? "text-sm" : "text-xs"
                                )}>
                                    {getInitials(user?.name)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Show text only in Sidebar, show Chevron only in Navbar */}
                    {isSidebar ? (
                        <div className="flex flex-col items-start text-left flex-1 min-w-0 ml-3">
                            <h3 className="font-semibold text-(--profile-text-color) leading-tight text-sm">
                                {user?.name}
                            </h3>
                            <p className="text-(--profile-title-color) leading-tight text-xs">
                                {user?.companyName}
                            </p>
                        </div>
                    ) : (
                        <ChevronDown className="h-4 w-4 text-slate-600 ml-1" />
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-64 p-0"
                side="bottom"
                align={isSidebar ? "center" : "end"}
                sideOffset={8}
            >
                <div className="flex flex-col">
                    {/* Profile Header */}
                    <div className="p-4 border-b border-(--profile-image-border-color)">
                        <div className="flex items-center gap-3">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={user?.name || ""}
                                    width={96}
                                    height={96}
                                    sizes="48px"
                                    className="rounded-[8px] object-contain w-12 h-12"
                                    unoptimized={imageUrl.startsWith("http")}
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-(--profile-liner-from-color) to-(--profile-liner-to-color) flex items-center justify-center border-2 border-(--profile-image-border-color)">
                                    <span className="text-(--navbar-bg-parent) text-base font-semibold">
                                        {getInitials(user?.name || "")}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-(--profile-name-color)">
                                    {user?.name}
                                </h3>
                                <p className="text-xs text-(--profile-title-color)">{user?.companyName}</p>
                            </div>
                        </div>
                    </div>
                    {/* Menu Items */}
                    <div className="py-1">

                        <Link
                            href="/"
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-(--profile-menu-text-color) hover:bg-(--Profile-hover-bg) cursor-pointer transition-colors rounded-none"
                            onClick={() => setOpen(false)}
                        >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-(--profile-menu-text-color) hover:bg-(--Profile-hover-bg) cursor-pointer transition-colors rounded-none"
                            onClick={() => setOpen(false)}
                        >
                            <HelpCircle className="w-4 h-4" />
                            <span>Help & Support</span>
                        </Link>
                        <div className="border-t border-(--profile-image-border-color) my-1" />
                        <button
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-(--profile-menu-sign-out-color) hover:bg-(--profile-menu-sign-out-bg) cursor-pointer transition-colors rounded-none"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}