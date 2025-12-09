import CompanyLayoutClient from "@/Components/layout/CompanyLayoutClient";






export interface CompanyLayoutProps {
    children: React.ReactNode;
}

export default function CompanyLayout({ children }: CompanyLayoutProps) {
    return <CompanyLayoutClient>{children}</CompanyLayoutClient>
}