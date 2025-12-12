
"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";

interface UserProfileProps {
    name?: string;
    title?: string;
    imageUrl?: string;
    variant?: "navbar" | "sidebar";
}

export default function UserProfiles({
    name = "Sarah Connor",
    title = "HR Manager",
    imageUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    variant = "navbar",
}: UserProfileProps) {
    const [open, setOpen] = useState(false);

    // Get initials from name
    const getInitials = (fullName: string) => {
        return fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const isSidebar = variant === "sidebar";

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className={cn(
                    "flex items-center cursor-pointer w-full",
                    isSidebar 
                        ? "px-3 py-2.5 rounded-lg hover:bg-(--Profile-hover-bg) transition-colors cursor-pointer" 
                        : "gap-1.5 sm:gap-2 md:gap-3 border-l border-(--profile-border-color) pl-2 sm:pl-3 md:pl-[16px]"
                )}>
                    {/* Profile Picture */}
                    <div className="relative shrink-0">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={name}
                                width={40}
                                height={40}
                                className={cn(
                                    "object-cover",
                                    isSidebar 
                                        ? "w-10 h-10 rounded-lg" 
                                        : "rounded-[8px] border-2 border-(--profile-image-border-color) w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
                                )}
                            />
                        ) : (
                            <div className={cn(
                                "bg-linear-to-br from-(--profile-liner-from-color) to-(--profile-liner-to-color) flex items-center justify-center",
                                isSidebar 
                                    ? "w-10 h-10 rounded-lg" 
                                    : "rounded-full border-2 border-(--profile-image-border-color) w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
                            )}>
                                <span className={cn(
                                    "text-(--navbar-bg-parent) font-semibold",
                                    isSidebar ? "text-sm" : "text-[10px] sm:text-xs md:text-sm"
                                )}>
                                    {getInitials(name)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col items-start text-left flex-1 min-w-0 ml-3">
                        <h3 className={cn(
                            "font-semibold text-(--profile-text-color) leading-tight",
                            isSidebar ? "text-sm" : "text-xs sm:text-sm md:text-base whitespace-nowrap"
                        )}>
                            {name}
                        </h3>
                        <p className={cn(
                            "text-(--profile-title-color) leading-tight",
                            isSidebar ? "text-xs" : "text-[10px] sm:text-xs md:text-sm whitespace-nowrap"
                        )}>
                            {title}
                        </p>
                    </div>
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
                                    alt={name}
                                    width={48}
                                    height={48}
                                    className="rounded-[8px] object-cover border-2 border-(--profile-image-border-color)"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-(--profile-liner-from-color) to-(--profile-liner-to-color) flex items-center justify-center border-2 border-(--profile-image-border-color)">
                                    <span className="text-(--navbar-bg-parent) text-base font-semibold">
                                        {getInitials(name)}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-(--profile-name-color)">
                                    {name}
                                </h3>
                                <p className="text-xs text-(--profile-title-color)">{title}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-(--profile-menu-text-color) hover:bg-(--Profile-hover-bg) cursor-pointer transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            View Profile
                        </button>
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-(--profile-menu-text-color) hover:bg-(--Profile-hover-bg) cursor-pointer transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Settings
                        </button>
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-(--profile-menu-text-color) hover:bg-(--Profile-hover-bg) cursor-pointer transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Help & Support
                        </button>
                        <div className="border-t border-gray-200 my-1" />
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-(--profile-menu-sign-out-color) hover:bg-(--profile-menu-sign-out-bg) cursor-pointer transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}