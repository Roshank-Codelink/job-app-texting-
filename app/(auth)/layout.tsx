import CandidateLoginLayout from "@/Components/layout/CandidateLoginLayout";


export interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <CandidateLoginLayout>{children}</CandidateLoginLayout>
}   