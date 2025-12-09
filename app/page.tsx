"use client";
import JobPost from "@/Components/Job-Post/JobPost";
import Navbar from "@/Components/Common/Navbar";
import Sidebar from "@/Components/Common/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import Link from "next/link";

export default function Home() {
  return (
<>
    <Link href="/employer/dashboard">Company Dashboard</Link>

</>
  );
}
