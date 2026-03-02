

const steps = [
  {
    number: "1",
    title: "Sign Up & Get Verified",
    description:
      "Register your company profile. Our admin team manually reviews and approves your account to ensure a trusted ecosystem for all users.",
  },
  {
    number: "2",
    title: "Post Job with AI Validation",
    description:
      "Create your job post with free-text. Our AI instantly analyzes clarity, structure, and generates an internal quality score to optimize reach.",
  },
  {
    number: "3",
    title: "Get Matched Candidates",
    description:
      "Your job appears in the smart feed, ranked by skill relevance, location, and freshness, connecting you directly with the right talent.",
  },
];

export default function JobitoWorkProcess() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[14px] sm:text-[14px] font-semibold font-[600]  text-(--job-post-button-bg-to) uppercase">
            Process
          </span>
          <h2 className=" text-[36px] sm:text-[36px] md:text-[36px] font-bold  font-[600] text-[#111827]">
            How Jobito Works for Employers
          </h2>
          <p className="mt-[16px] text-[14px] sm:text-[16px] md:text-[20px] text-[#6B7280] max-w-2xl mx-auto">
            Three simple steps to connect with top talent efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group cursor-pointer rounded-2xl bg-[#F9F8FB] border border-[#E2E8F0] shadow-[0_18px_45px_rgba(15,23,42,0.06)] px-5 py-6 sm:px-6 sm:py-7 flex flex-col h-full transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:border-(--job-post-button-bg-to)/50"
            >
              <div className="inline-flex items-center justify-center h-[56px] w-[56px] sm:h-[56px] sm:w-[56px] rounded-[8px] bg-[#FFFFFF] text-(--job-post-button-bg-to) text-[24px] sm:text-[24px] font-bold mb-4 transition-colors duration-200 group-hover:bg-(--job-post-button-bg-to) group-hover:text-white">
                {step.number}
              </div>
              <h3 className="text-[20px] sm:text-[20px] font-bold text-[#111827] mb-2">
                {step.title}
              </h3>
              <p className="text-[16px] sm:text-[16px] text-[#4B5563] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
