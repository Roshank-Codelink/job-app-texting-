"use client";

import { ExternalLink, Edit2 } from "lucide-react";
import { EmployerInfoData } from "@/api_config/EmployerInfoApi/type";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";

interface ProfileTabsContentProps {
  type: "overview" | "about";
  employerInfo: EmployerInfoData;
  isEditMode: boolean;
  formData: {
    companyName: string;
    companyAddress: string;
    companyWebsite: string;
    contactNumber: string;
    email: string;
    name: string;
    about: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    companyName: string;
    companyAddress: string;
    companyWebsite: string;
    contactNumber: string;
    email: string;
    name: string;
    about: string;
  }>>;
  setIsEditMode?: (value: boolean) => void;
  onSave?: () => void;
}

export default function ProfileTabsContent({ type, employerInfo, isEditMode, formData, setFormData, setIsEditMode, onSave }: ProfileTabsContentProps) {
  if (type === "overview") {
    return (
      <div className="p-5 pb-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-(--profile-menu-text-color) leading-relaxed">
              Codelink Infotech embarks on the journey in 2018. Moving backward, founders have over 9 years of proficiency in the IT field, which indicates that if the foundation is strong, the building is robust.
            </p>
            <p className="text-sm text-(--profile-menu-text-color) leading-relaxed">
              Be it any complex puzzle related to technology, Codelink Infotech will equip you with limitless possibilities and unimaginable solutions. We are here to <strong>UNLOCK AND SIMPLIFY</strong> your business needs and concerns. At Codelink, our dedicated team members help you leverage your business by using leading-edge technologies. We keep codes and clients at heart in everything we do.
            </p>
            <p className="text-sm text-(--profile-menu-text-color) leading-relaxed">
              You are just a step away from our tireless support. Get in touch today as we are excited about your imagination which we will transform into a profitable venture.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-base font-semibold text-(--post-card-bg-color)">🌟 Experience our skillset through the projects:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-(--profile-menu-text-color)">
              <div className="space-y-1">
                <p>✔ ReactJS, VueJS, Angular, Node</p>
                <p>✔ PHP, Laravel, CodeIgniter, CakePHP, WordPress, WooCommerce</p>
                <p>✔ MySQL, MySQL Programming, MongoDB, Firebase, and More</p>
                <p>✔ Swift, Swift-UI, Objective-C, Java, Flutter</p>
              </div>
              <div className="space-y-1">
                <p>✔ HTML, Bootstrap, CSS</p>
                <p>✔ Tools: GitHub, Bitbucket, Trello, Jira, Zeplin, ClickUp</p>
                <p>✔ AWS, Google Cloud, Digital Ocean, Dedicated, GoDaddy, Hostgator, etc.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-base font-semibold text-(--post-card-bg-color)">🌟 Why choose Codelink?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-(--profile-menu-text-color)">
              <div className="space-y-1">
                <p>✔ Access to free QA support</p>
                <p>✔ Smooth flow of communication</p>
                <p>✔ Deep-rooted relationship with Client</p>
                <p>✔ Development server support</p>
              </div>
              <div className="space-y-1">
                <p>✔ Prompt delivery of projects</p>
                <p>✔ Highly dedicated team and experienced leaders</p>
                <p>✔ Immediate responses</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-base font-semibold text-(--post-card-bg-color)">🌟 Quick facts at a glance:</h4>
            <div className="text-sm text-(--profile-menu-text-color) space-y-1">
              <p>✔ Completed 300+ Projects of 29 countries and 200 clients at various marketplaces; globally, since 2013.</p>
              <p>✔ 100% client satisfaction is our vision</p>
              <p>✔ History of satisfied clients who bounce back with more projects.</p>
              <p>✔ up to 9 years of tech experts</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "about") {
    return (
      <div className="p-5 pb-6 space-y-4">
        {/* Edit Button */}
        <div className="flex justify-end mb-2">
          {!isEditMode ? (
            <Button
              onClick={() => setIsEditMode?.(true)}
              variant="outline"
              className="w-auto flex items-center gap-2 border-(--profile-border-color) hover:bg-(--navbar-bg-button) hover:text-(--navbar-text-color) cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditMode?.(false)}
                variant="outline"
                className="w-auto border-(--profile-border-color) cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave?.();
                  setIsEditMode?.(false);
                }}
                className="w-auto bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white hover:from-(--navbar-text-color) hover:to-(--job-post-button-hover) cursor-pointer"
              >
                Save
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-(--profile-title-color) mb-1.5">
              Company Name<span className="text-(--profile-menu-sign-out-color) ml-1">*</span>
            </p>
            <Input
              type="text"
              value={formData.companyName || employerInfo?.companyName || ""}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              disabled={!isEditMode}
              className="w-full border-(--profile-border-color) focus:ring-(--navbar-text-color) text-gray-800 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-(--profile-title-color) mb-1.5">
              Company Website<span className="text-(--profile-menu-sign-out-color) ml-1">*</span>
            </p>
            <Input
              type="text"
              value={formData.companyWebsite || employerInfo?.companyWebsite || ""}
              onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
              disabled={!isEditMode}
              className="w-full border-(--profile-border-color) focus:ring-(--navbar-text-color) text-(--post-card-bg-color) text-sm disabled:bg-(--Profile-hover-bg) disabled:cursor-not-allowed"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-(--profile-title-color) mb-1.5">
            Company Address<span className="text-(--profile-menu-sign-out-color) ml-1">*</span>
          </p>
          <Textarea
            value={formData.companyAddress || employerInfo?.companyAddress || ""}
            onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
            disabled={!isEditMode}
            className="w-full border-(--profile-border-color) focus:ring-(--navbar-text-color) text-(--post-card-bg-color) text-sm disabled:bg-(--Profile-hover-bg) disabled:cursor-not-allowed"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-(--profile-title-color) mb-1.5">
              Contact Number<span className="text-(--profile-menu-sign-out-color) ml-1">*</span>
            </p>
            <Input
              type="tel"
              value={formData.contactNumber || employerInfo?.contactNumber || ""}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              disabled={!isEditMode}
              className="w-full border-(--profile-border-color) focus:ring-(--navbar-text-color) text-(--post-card-bg-color) text-sm disabled:bg-(--Profile-hover-bg) disabled:cursor-not-allowed"
              placeholder="Enter contact number"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-(--profile-title-color) mb-1.5">
              Email Address (Not Editable)
            </p>
            <Input
              type="email"
              value={formData.email || employerInfo?.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={true}
              className="w-full border-(--profile-border-color) focus:ring-(--navbar-text-color) text-(--post-card-bg-color) text-sm disabled:bg-(--Profile-hover-bg) disabled:cursor-not-allowed"
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-(--profile-title-color) mb-1.5">
            Contact Person<span className="text-(--profile-menu-sign-out-color) ml-1">*</span>
          </p>
          <Input
            type="text"
            value={formData.name || employerInfo?.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditMode}
            className="w-full border-(--profile-border-color) focus:ring-(--navbar-text-color) text-(--post-card-bg-color) text-sm disabled:bg-(--Profile-hover-bg) disabled:cursor-not-allowed"
            placeholder="Enter contact person name"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-(--profile-title-color) mb-1.5">
            About Company<span className="text-(--profile-menu-sign-out-color) ml-1">*</span>
          </p>
          <Textarea
            value={formData.about || (employerInfo?.name ? `Welcome to ${employerInfo.companyName || "our company"}. We are dedicated to ${employerInfo.name}'s vision of digital intelligence and innovation.` : "")}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            disabled={!isEditMode}
            className="w-full border-(--profile-border-color) focus:ring-(--navbar-text-color) text-(--post-card-bg-color) text-sm disabled:bg-(--Profile-hover-bg) disabled:cursor-not-allowed"
            rows={4}
            placeholder="Enter company description..."
          />
        </div>
      </div>
    );
  }

  return null;
}

