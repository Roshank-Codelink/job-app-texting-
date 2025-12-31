import EmployerLoginLayout from "@/Components/layout/EmployerLoginLayout";


export interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <EmployerLoginLayout>{children}</EmployerLoginLayout>
}   