import CandidateLoginLayout from "@/Components/layout/CandidateLoginLayout";




export interface CandidateAuthLayoutProps {
    children: React.ReactNode;
}

export default function CandidateAuthLayout({ children }: CandidateAuthLayoutProps) {
    return <CandidateLoginLayout>{children}</CandidateLoginLayout>
}