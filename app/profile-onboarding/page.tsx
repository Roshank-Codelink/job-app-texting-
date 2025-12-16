import MultiStepForm from "@/Components/ProfileOnboarding/Multi-Step-form";


export default function ProfileOnboarding() {
    return (
        <div className="min-h-screen flex items-center justify-center inset-0 bg-gradient-to-br from-[#f0f9ff] via-white to-[#dcfce7]">
            <div className= "w-[50%] h-[650px] ">
                <MultiStepForm />
            </div>
           
        </div>
    )
}