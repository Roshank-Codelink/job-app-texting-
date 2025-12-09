"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
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

export default function AppSidebar() {
  return (
    <Sidebar className="bg-white">

      {/* ✅ Only ONE wrapper inside Sidebar */}
      <div className="h-full md:h-[calc(100vh-60px)] w-full flex flex-col px-[16px] py-[16px] md:py-[16px] bg-white">

        {/* TOP MENU */}
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto custom-scrollbar">
          <SidebarContent className="flex-1 min-h-0 flex flex-col pt-4 md:pt-0 pb-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">

                  {/* Dashboard */}
                  <SidebarMenuItem className="flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg bg-[#f0f9ff] border-r-[3px] border-[#0ea5e9]">
                    <SidebarMenuButton className="hover:bg-transparent group cursor-pointer">
                      <AlertCircle className="text-[#0ea5e9] w-5 h-5 group-hover:scale-110 transition" />
                      <span className="text-[#0ea5e9] text-base">Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Job Posts */}
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      variant="outline"
                      className="flex items-center gap-3 px-4 py-5 rounded-lg bg-transparent hover:bg-[#f0f9ff] text-[#64748b] hover:text-[#0ea5e9] w-full group [&:hover_svg]:text-[#0ea5e9] [&:hover_svg]:scale-110 [&_svg]:transition cursor-pointer"
                    >
                      <FileText className="text-[#64748b] w-5 h-5" />
                      <span>Job Posts</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Candidates */}
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      variant="outline"
                      className="flex items-center gap-3 px-4 py-5 rounded-lg bg-transparent hover:bg-[#f0f9ff] text-[#64748b] hover:text-[#0ea5e9] w-full group [&:hover_svg]:text-[#0ea5e9] [&:hover_svg]:scale-110 [&_svg]:transition cursor-pointer"
                    >
                      <User className="text-[#64748b] w-5 h-5" />
                      <span>Candidates</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Interviews */}
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      variant="outline"
                      className="flex items-center gap-3 px-4 py-5 rounded-lg bg-transparent hover:bg-[#f0f9ff] text-[#64748b] hover:text-[#0ea5e9] w-full group [&:hover_svg]:text-[#0ea5e9] [&:hover_svg]:scale-110 [&_svg]:transition cursor-pointer"
                    >
                      <Calendar className="text-[#64748b] w-5 h-5" />
                      <span>Interviews</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Analytics */}
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      variant="outline"
                      className="flex items-center gap-3 px-4 py-5 rounded-lg bg-transparent hover:bg-[#f0f9ff] text-[#64748b] hover:text-[#0ea5e9] w-full group [&:hover_svg]:text-[#0ea5e9] [&:hover_svg]:scale-110 [&_svg]:transition cursor-pointer"
                    >
                      <PieChart className="text-[#64748b] w-5 h-5" />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Settings */}
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      variant="outline"
                      className="flex items-center gap-3 px-4 py-5 rounded-lg bg-transparent hover:bg-[#f0f9ff] text-[#64748b] hover:text-[#0ea5e9] w-full group [&:hover_svg]:text-[#0ea5e9] [&:hover_svg]:scale-110 [&_svg]:transition cursor-pointer"
                    >
                      <Settings className="text-[#64748b] w-5 h-5" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* UPGRADE CARD - At Bottom */}
          <div className="mt-auto p-2 pb-6 md:pb-2 shrink-0">
            <div className="bg-gradient-to-br from-[#f0f9ff] to-white border rounded-lg p-4 flex flex-col items-center gap-3 w-full">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <BiSolidZap className="w-6 h-6 text-[#0284C7]" />
              </div>

              <h3 className="font-bold text-sm text-[#1E293B]">Upgrade Plan</h3>
              <p className="text-xs text-gray-600 text-center">
                Unlock AI features for unlimited job posts.
              </p>

              <Button className="w-full py-2 bg-slate-800 text-white text-xs rounded-lg hover:bg-slate-900">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* END WRAPPER */}

    </Sidebar>
  );
}
