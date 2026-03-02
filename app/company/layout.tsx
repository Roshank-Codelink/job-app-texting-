import Footer from "@/Components/landing/Footer/Footer";
import Navbar from "@/Components/landing/Navbar/Navbar";



export default function CompanyLayout({
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