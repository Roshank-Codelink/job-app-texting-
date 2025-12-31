"use client";
import Link from "next/link";

export default function Home() {
  return (
<>
<div className="w-full h-full flex justify-center items-center gap-10">
  <Link href="/employer/dashboard">Company Dashboard</Link>
  <Link href="/employer-signin">Employer Login</Link>
  <Link href="/candidate-signin">Candidate Onboarding</Link>
</div>
</>);}
