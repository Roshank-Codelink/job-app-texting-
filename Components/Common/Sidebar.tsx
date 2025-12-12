"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarProvider,
} from "@/Components/ui/sidebar";

import {
  AlertCircle,
  FileText,
  User,
  Calendar,
  PieChart,
  Settings,
} from "lucide-react";

import { BiSolidZap } from "react-icons/bi";
import { Button } from "@/Components/ui/button";
import UserProfiles from "./UserProfiles";

export default function AppSidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");

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
                    className={`rounded-lg transition-all ${
                      activeItem === "dashboard" 
                        ? "bg-(--navbar-bg-button) border-r-[3px] border-(--navbar-text-color)" 
                        : ""
                    }`}
                  >
                    <SidebarMenuButton 
                      onClick={() => setActiveItem("dashboard")}
                      className={`flex items-center gap-3 px-4 py-5 rounded-lg w-full cursor-pointer border-none shadow-none outline-none [&_svg]:transition ${
                        activeItem === "dashboard"
                          ? "bg-transparent hover:bg-transparent text-(--navbar-text-color) [&_svg]:text-(--navbar-text-color)"
                          : "bg-transparent hover:bg-(--navbar-bg-button) text-(--profile-title-color) hover:text-(--navbar-text-color) [&_svg]:text-(--sidebar-menu-icone-color) [&:hover_svg]:text-(--navbar-text-color) [&:hover_svg]:scale-110"
                      }`}
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span className={activeItem === "dashboard" ? "font-medium" : ""}>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Job Posts */}
                  <SidebarMenuItem 
                    className={`rounded-lg transition-all ${
                      activeItem === "job-posts" 
                        ? "bg-(--navbar-bg-button) border-r-[3px] border-(--navbar-text-color)" 
                        : ""
                    }`}
                  >
                    <SidebarMenuButton 
                      onClick={() => setActiveItem("job-posts")}
                      className={`flex items-center gap-3 px-4 py-5 rounded-lg w-full cursor-pointer border-none shadow-none outline-none [&_svg]:transition ${
                        activeItem === "job-posts"
                          ? "bg-transparent hover:bg-transparent text-(--navbar-text-color) font-medium [&_svg]:text-(--navbar-text-color)"
                          : "bg-transparent hover:bg-(--navbar-bg-button) text-(--profile-title-color) hover:text-(--navbar-text-color) [&_svg]:text-(--sidebar-menu-icone-color) [&:hover_svg]:text-(--navbar-text-color) [&:hover_svg]:scale-110"
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                      <span>Job Posts</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Candidates */}
                  <SidebarMenuItem 
                    className={`rounded-lg transition-all ${
                      activeItem === "candidates" 
                        ? "bg-(--navbar-bg-button) border-r-[3px] border-(--navbar-text-color)" 
                        : ""
                    }`}
                  >
                    <SidebarMenuButton 
                      onClick={() => setActiveItem("candidates")}
                      className={`flex items-center gap-3 px-4 py-5 rounded-lg w-full cursor-pointer border-none shadow-none outline-none [&_svg]:transition ${
                        activeItem === "candidates"
                          ? "bg-transparent hover:bg-transparent text-(--navbar-text-color) font-medium [&_svg]:text-(--navbar-text-color)"
                          : "bg-transparent hover:bg-(--navbar-bg-button) text-(--profile-title-color) hover:text-(--navbar-text-color) [&_svg]:text-(--sidebar-menu-icone-color) [&:hover_svg]:text-(--navbar-text-color) [&:hover_svg]:scale-110"
                      }`}
                    >
                      <User className="w-5 h-5" />
                      <span>Candidates</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Interviews */}
                  <SidebarMenuItem 
                    className={`rounded-lg transition-all ${
                      activeItem === "interviews" 
                        ? "bg-(--navbar-bg-button) border-r-[3px] border-(--navbar-text-color)" 
                        : ""
                    }`}
                  >
                    <SidebarMenuButton 
                      onClick={() => setActiveItem("interviews")}
                      className={`flex items-center gap-3 px-4 py-5 rounded-lg w-full cursor-pointer border-none shadow-none outline-none [&_svg]:transition ${
                        activeItem === "interviews"
                          ? "bg-transparent hover:bg-transparent text-(--navbar-text-color) font-medium [&_svg]:text-(--navbar-text-color)"
                          : "bg-transparent hover:bg-(--navbar-bg-button) text-(--profile-title-color) hover:text-(--navbar-text-color) [&_svg]:text-(--sidebar-menu-icone-color) [&:hover_svg]:text-(--navbar-text-color) [&:hover_svg]:scale-110"
                      }`}
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Interviews</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Analytics */}
                  <SidebarMenuItem 
                    className={`rounded-lg transition-all ${
                      activeItem === "analytics" 
                        ? "bg-(--navbar-bg-button) border-r-[3px] border-(--navbar-text-color)" 
                        : ""
                    }`}
                  >
                    <SidebarMenuButton 
                      onClick={() => setActiveItem("analytics")}
                      className={`flex items-center gap-3 px-4 py-5 rounded-lg w-full cursor-pointer border-none shadow-none outline-none [&_svg]:transition ${
                        activeItem === "analytics"
                          ? "bg-transparent hover:bg-transparent text-(--navbar-text-color) font-medium [&_svg]:text-(--navbar-text-color)"
                          : "bg-transparent hover:bg-(--navbar-bg-button) text-(--profile-title-color) hover:text-(--navbar-text-color) [&_svg]:text-(--sidebar-menu-icone-color) [&:hover_svg]:text-(--navbar-text-color) [&:hover_svg]:scale-110"
                      }`}
                    >
                      <PieChart className="w-5 h-5" />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Settings */}
                  <SidebarMenuItem 
                    className={`rounded-lg transition-all ${
                      activeItem === "settings" 
                        ? "bg-(--navbar-bg-button) border-r-[3px] border-(--navbar-text-color)" 
                        : ""
                    }`}
                  >
                    <SidebarMenuButton 
                      onClick={() => setActiveItem("settings")}
                      className={`flex items-center gap-3 px-4 py-5 rounded-lg w-full cursor-pointer border-none shadow-none outline-none [&_svg]:transition ${
                        activeItem === "settings"
                          ? "bg-transparent hover:bg-transparent text-(--navbar-text-color) font-medium [&_svg]:text-(--navbar-text-color)"
                          : "bg-transparent hover:bg-(--navbar-bg-button) text-(--profile-title-color) hover:text-(--navbar-text-color) [&_svg]:text-(--sidebar-menu-icone-color) [&:hover_svg]:text-(--navbar-text-color) [&:hover_svg]:scale-110"
                      }`}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* UPGRADE CARD - At Bottom */}
          <div className="mt-auto p-2 shrink-0">
            <div className="bg-gradient-to-br from-(--navbar-bg-button) to-(--sidebar-bg-color) border rounded-lg p-4 flex flex-col items-center gap-3 w-full">
              <div className="w-12 h-12 bg-(--profile-bg-color) rounded-full flex items-center justify-center">
                <BiSolidZap className="w-6 h-6 text-(--navbar-text-color)" />
              </div>

              <h3 className="font-bold text-sm text-(--profile-text-color)">Upgrade Plan</h3>
              <p className="text-xs text-(--profile-title-color) text-center">
                Unlock AI features for unlimited job posts.
              </p>

              <Button className="w-full py-2 bg-(--profile-text-color) text-(--sidebar-bg-color) text-xs rounded-lg hover:bg-(--profile-text-color) hover:text-(--sidebar-bg-color)">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>

        {/* USER PROFILE - At Absolute Bottom - Visible only on mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-2 pb-4 md:hidden">
          <UserProfiles variant="sidebar" />
        </div>
      </div>
      {/* END WRAPPER */}

    </Sidebar>  
  );
}
