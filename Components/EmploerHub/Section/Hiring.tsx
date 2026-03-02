import Link from "next/link";
export default function Hiring() {
    return (
        <>
            <section className="w-full flex flex-col bg-white">
                <div className="w-full flex justify-center items-center bg-white h-auto md:h-[421px] py-10 sm:py-12 md:py-0">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
                        <div className="text-center max-w-2xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold font-[800] text-[#111827]">
                                Start Hiring Smarter Today
                            </h2>
                            <p className="mt-2 sm:mt-3 text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-[#6B7280]">
                                Join thousands of forward-thinking companies using Jobito to build their dream teams.
                            </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                            <Link
                                href="/employer-signup"
                                className="rounded-full bg-(--job-post-button-bg-to) px-6 sm:px-8 py-2.5 sm:py-3 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.3)] hover:bg-(--navbar-text-color) transition-colors"
                            >

                                Create Employer Account

                            </Link>
                            <Link
                                href="/employer-signin"
                                className="rounded-full border border-(--job-post-button-bg-to)/50 bg-white/90 px-6 sm:px-8 py-2.5 sm:py-3 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-semibold text-(--job-post-button-bg-to) hover:bg-(--job-post-button-bg-to)/5 transition-colors"
                            >
                                Post a Job
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
