import CandidateNavbar from "@/Components/Candidate-Portal/Navbar";



export default function CandidateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full bg-[#fafafb]">
            <CandidateNavbar />
            <div className="w-full md:mt-4 pb-4 -mt-px">
                {children}
            </div>
        </div>
    )
}