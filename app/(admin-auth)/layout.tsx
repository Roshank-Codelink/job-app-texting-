import AdminLoginLayout from "@/Components/layout/AdminLoginLayout";
export interface AdminAuthLayoutProps {
    children: React.ReactNode;
}

export default function AdminAuthLayout({ children }: AdminAuthLayoutProps) {
    return <AdminLoginLayout>{children}</AdminLoginLayout>
}