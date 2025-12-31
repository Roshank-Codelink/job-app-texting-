import MultiStepForm from "@/Components/ProfileOnboarding/Multi-Step-form";
export default function ProfileOnboarding() {
    return (
        <div className="h-screen w-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-white to-[#dcfce7] p-2 sm:p-4 md:p-6">
            <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[60%] xl:max-w-[50%] h-full max-h-screen flex items-center justify-center overflow-hidden">
                <MultiStepForm />
            </div>
        </div>
    )
}