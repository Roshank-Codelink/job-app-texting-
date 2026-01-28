"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";
import {
  AlertCircle,
  Users
} from "lucide-react";
import Link from "next/link";
import AdminProfile from "./AdminProfile";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");
  const { data: session } = useSession();
  const user = session?.user;

  // Set active item based on current pathname
  useEffect(() => {
    if (pathname?.includes("/admin/dashboard")) {
      setActiveItem("dashboard");
    } else if (pathname?.includes("/admin/manage-employers")) {
      setActiveItem("manage-employers");
    } else {
      setActiveItem(""); // Default to no selection
    }
  }, [pathname]);

  return (
    <Sidebar className="bg-(--sidebar-bg-color)">
      {/* ✅ Only ONE wrapper inside Sidebar */}
      <div className="h-full md:h-[calc(100vh-60px)] w-full flex flex-col px-[16px] py-[16px] md:py-[16px]  bg-(--sidebar-bg-color) relative">
        {/* TOP MENU */}
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto custom-scrollbar pb-20 md:pb-0">
          <SidebarContent className="flex-1 min-h-0 flex flex-col pt-4 md:pt-0 pb-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
                  {/* Dashboard */}
                  <SidebarMenuItem
                    className={`rounded-lg transition-all ${activeItem === "dashboard"
                      ? "bg-(--navbar-bg-button) border-r-[3px] border-(--navbar-text-color)"
                      : ""
                      }`}
                  >
                    <Link href="/admin/dashboard">
                      <SidebarMenuButton
                        onClick={() => setActiveItem("dashboard")}
                        className={`flex items-center gap-3 px-4 py-5 rounded-lg w-full cursor-pointer border-none shadow-none outline-none [&_svg]:transition ${activeItem === "dashboard"
                          ? "bg-transparent hover:bg-transparent text-(--navbar-text-color) [&_svg]:text-(--navbar-text-color)"
                          : "bg-transparent hover:bg-(--navbar-bg-button) text-(--profile-title-color) hover:text-(--navbar-text-color) [&_svg]:text-(--sidebar-menu-icone-color) [&:hover_svg]:text-(--navbar-text-color) [&:hover_svg]:scale-110"
                          }`}
                      >
                        <AlertCircle className="w-5 h-5" />
                        <span className={activeItem === "dashboard" ? "font-medium" : ""}>Dashboard</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>

                  {/* Manage Employers */}
                  <SidebarMenuItem
                    className={`rounded-lg transition-all ${activeItem === "manage-employers"
                      ? "bg-(--navbar-bg-button) border-r-[3px] border-(--navbar-text-color)"
                      : ""
                      }`}
                  >
                    <Link href="/admin/manage-employers">
                      <SidebarMenuButton
                        onClick={() => setActiveItem("manage-employers")}
                        className={`flex items-center gap-3 px-4 py-5 rounded-lg w-full cursor-pointer border-none shadow-none outline-none [&_svg]:transition ${activeItem === "manage-employers"
                          ? "bg-transparent hover:bg-transparent text-(--navbar-text-color) font-medium [&_svg]:text-(--navbar-text-color)"
                          : "bg-transparent hover:bg-(--navbar-bg-button) text-(--profile-title-color) hover:text-(--navbar-text-color) [&_svg]:text-(--sidebar-menu-icone-color) [&:hover_svg]:text-(--navbar-text-color) [&:hover_svg]:scale-110"
                          }`}
                      >
                        <Users className="w-5 h-5" />
                        <span>Manage Employers</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

        </div>
        {/* USER PROFILE - At Absolute Bottom - Visible only on mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-2 pb-4 md:hidden">
          <AdminProfile variant="sidebar" user={user} />
        </div>
      </div>
      {/* END WRAPPER */}
    </Sidebar>
  );
}
