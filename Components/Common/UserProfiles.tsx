
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
}

export default function UserProfiles({
    name = "Sarah Connor",
    title = "HR Manager",
    imageUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
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

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-1.5 sm:gap-2 md:gap-3 border-l border-[#f1f5f9] pl-2 sm:pl-3 md:pl-[16px] cursor-pointer">
                    {/* Text Content - Left Side */}
                    <div className="flex flex-col items-start text-left">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#1E293B] leading-tight whitespace-nowrap">
                            {name}
                        </h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 leading-tight whitespace-nowrap">
                            {title}
                        </p>
                    </div>

                    {/* Profile Picture - Right Side */}
                    <div className="relative shrink-0">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover border-2 border-gray-200 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
                            />
                        ) : (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-200">
                                <span className="text-white text-[10px] sm:text-xs md:text-sm font-semibold">
                                    {getInitials(name)}
                                </span>
                            </div>
                        )}
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-64 p-0"
                side="bottom"
                align="end"
                sideOffset={8}
            >
                <div className="flex flex-col">
                    {/* Profile Header */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover border-2 border-gray-200"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-gray-200">
                                    <span className="text-white text-base font-semibold">
                                        {getInitials(name)}
                                    </span>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    {name}
                                </h3>
                                <p className="text-xs text-gray-500">{title}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            View Profile
                        </button>
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Settings
                        </button>
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            Help & Support
                        </button>
                        <div className="border-t border-gray-200 my-1" />
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
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