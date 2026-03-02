
import Navbar from "@/Components/EmploerHub/Navbar/Navbar";
import Footer from "@/Components/landing/Footer/Footer";





export default function EmployerHubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />  
            <div className="mx-auto">
                {children}
            </div>
            <Footer />
        </>
    );
}
