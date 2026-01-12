
import { auth } from "@/lib/auth-config";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default async function Home() {

  const session = await auth();
  console.log("Session:", session);
  return (
<>
<div className="w-full h-full flex justify-center items-center gap-10">
{!session && <Link href="/candidate-signin">Candidate Login</Link>}
{!session && <Link href="/employer-signin">Employer Login</Link>}
{session?.user?.role==="EMPLOYER" && <Link href="/employer/dashboard">Company Dashboard</Link>}
{session?.user?.role==="EMPLOYEE" && <Link href="/candidate/jobs">Candidate Dashboard</Link>}

</div>
</>);}
