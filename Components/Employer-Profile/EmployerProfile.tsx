"use client";

import { useState } from "react";
import { EmployerInfoData } from "@/api_config/EmployerInfoApi/type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import CompanyProfileHeader from "./CompanyProfileHeader";
import ProfileTabsContent from "./ProfileTabsContent";

export default function EmployerProfile({ employerInfo }: { employerInfo: EmployerInfoData }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    companyName: employerInfo?.companyName || "",
    companyAddress: employerInfo?.companyAddress || "",
    companyWebsite: employerInfo?.companyWebsite || "",
    contactNumber: employerInfo?.contactNumber || "",
    email: employerInfo?.email || "",
    name: employerInfo?.name || "",
    about: employerInfo?.name ? `Welcome to ${employerInfo.companyName || "our company"}. We are dedicated to ${employerInfo.name}'s vision of digital intelligence and innovation.` : ""
  });

  const handleSave = () => {
    // TODO: Add API call to save data
    console.log("Saving data:", formData);
    setIsEditMode(false);
  };

  return (
    <div className="w-full sm:w-[98%] h-full mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6">
        <CompanyProfileHeader employerInfo={employerInfo} />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Right - Tabs Section */}
        <div className="flex-1 w-full min-w-0">
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b border-(--profile-image-border-color)">
              <TabsList className="bg-transparent rounded-none p-0 h-auto flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-start">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:text-(--navbar-text-color) data-[state=inactive]:text-(--profile-title-color) px-0 py-3 sm:py-4 pb-3 sm:pb-4 rounded-none font-medium text-xs sm:text-sm md:text-[15px] border-b-2 border-transparent data-[state=active]:border-(--navbar-text-color) data-[state=active]:-mb-px transition-all hover:text-(--navbar-text-color) relative cursor-pointer bg-transparent whitespace-nowrap"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:text-(--navbar-text-color) data-[state=inactive]:text-(--profile-title-color) px-0 py-3 sm:py-4 pb-3 sm:pb-4 rounded-none font-medium text-xs sm:text-sm md:text-[15px] border-b-2 border-transparent data-[state=active]:border-(--navbar-text-color) data-[state=active]:-mb-px transition-all hover:text-(--navbar-text-color) relative cursor-pointer bg-transparent whitespace-nowrap"
                >
                  About
                </TabsTrigger>
                {/* <TabsTrigger
                  value="jobs"
                  className="data-[state=active]:text-(--navbar-text-color) data-[state=inactive]:text-(--profile-title-color) px-0 py-3 sm:py-4 pb-3 sm:pb-4 rounded-none font-medium text-xs sm:text-sm md:text-[15px] border-b-2 border-transparent data-[state=active]:border-(--navbar-text-color) data-[state=active]:-mb-px transition-all hover:text-(--navbar-text-color) relative cursor-pointer bg-transparent whitespace-nowrap"
                >
                  Jobs
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  className="data-[state=active]:text-(--navbar-text-color) data-[state=inactive]:text-(--profile-title-color) px-0 py-3 sm:py-4 pb-3 sm:pb-4 rounded-none font-medium text-xs sm:text-sm md:text-[15px] border-b-2 border-transparent data-[state=active]:border-(--navbar-text-color) data-[state=active]:-mb-px transition-all hover:text-(--navbar-text-color) relative cursor-pointer bg-transparent whitespace-nowrap"
                >
                  Team
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:text-(--navbar-text-color) data-[state=inactive]:text-(--profile-title-color) px-0 py-3 sm:py-4 pb-3 sm:pb-4 rounded-none font-medium text-xs sm:text-sm md:text-[15px] border-b-2 border-transparent data-[state=active]:border-(--navbar-text-color) data-[state=active]:-mb-px transition-all hover:text-(--navbar-text-color) relative cursor-pointer bg-transparent whitespace-nowrap"
                >
                  Reviews
                </TabsTrigger> */}
              </TabsList>
            </div>

            <TabsContent value="overview" className="mt-3 sm:mt-4">
              <Card className="bg-white border-(--profile-border-color) shadow-lg mb-4">
                <CardContent className="p-0">
                  <ProfileTabsContent 
                    type="overview" 
                    employerInfo={employerInfo} 
                    isEditMode={isEditMode}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="mt-3 sm:mt-4">
              <Card className="bg-white border-(--profile-border-color) shadow-lg mb-4">
                <CardContent className="p-0">
                  <ProfileTabsContent 
                    type="about" 
                    employerInfo={employerInfo} 
                    isEditMode={isEditMode}
                    formData={formData}
                    setFormData={setFormData}
                    setIsEditMode={setIsEditMode}
                    onSave={handleSave}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="mt-3 sm:mt-4">
              <Card className="bg-white border-(--profile-border-color) shadow-lg mb-4">
                <CardContent className="p-4 sm:p-5">
                  <p className="text-sm text-gray-600">Jobs content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="mt-3 sm:mt-4">
              <Card className="bg-white border-(--profile-border-color) shadow-lg mb-4">
                <CardContent className="p-4 sm:p-5">
                  <p className="text-sm text-gray-600">Team content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-3 sm:mt-4">
              <Card className="bg-white border-(--profile-border-color) shadow-lg mb-4">
                <CardContent className="p-4 sm:p-5">
                  <p className="text-sm text-(--job-post-button-disabled-text-color)">Reviews content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
