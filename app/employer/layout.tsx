import CompanyLayoutClient from "@/Components/layout/CompanyLayoutClient";
import "../globals.css";





export interface CompanyLayoutProps {
    children: React.ReactNode;
}

export default function CompanyLayout({ children }: CompanyLayoutProps) {
    return <CompanyLayoutClient>{children}</CompanyLayoutClient>
}