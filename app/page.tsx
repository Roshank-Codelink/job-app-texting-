"use client";
import JobPost from "@/Components/Job-Post/JobPost";
import Navbar from "@/Components/Common/Navbar";
import Sidebar from "@/Components/Common/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import Link from "next/link";

export default function Home() {
  return (
<>
<div className="w-full h-full flex justify-center items-center gap-10">
  <Link href="/employer/dashboard">Company Dashboard</Link>
  <Link href="/signin">Candidate Login</Link>
</div>

   

</>
  );
}
