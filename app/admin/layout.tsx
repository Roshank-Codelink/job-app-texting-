
import AdminLayoutClient from "@/Components/Admin/AdminLayoutClient";
import "../globals.css";

export interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return <AdminLayoutClient>{children}</AdminLayoutClient>
}