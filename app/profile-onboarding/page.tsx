import MultiStepForm from "@/Components/ProfileOnboarding/Multi-Step-form";


export default function ProfileOnboarding() {
    return (
        <div className="min-h-screen flex items-center justify-center inset-0 bg-gradient-to-br from-[#f0f9ff] via-white to-[#dcfce7] p-2 sm:p-4 md:p-6">
            <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] h-auto min-h-[650px]">
                <MultiStepForm />
            </div>
           
        </div>
    )
}