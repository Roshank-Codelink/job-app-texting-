import Link from "next/link";

export default function JobitoIntro() {
  return (
    <section className="w-full flex flex-col bg-white">
      <div className="w-full bg-[#020617] flex justify-center items-center relative overflow-hidden md:min-h-[361px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.18),_transparent_55%)]" />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[11px] sm:text-xs font-semibold uppercase  text-slate-100">
            For Employers
          </div>
          <h2 className="mt-5 text-2xl sm:text-3xl md:text-[32px] lg:text-4xl font-bold font-[700] text-white mb-4">
            Hiring? Post Jobs with AI Validation
          </h2>
          <p className="mt-3 text-[13px] sm:text-[14px] md:text-[18px] text-[#CBD5E1] max-w-2xl mx-auto">
            Create verified job listings, track engagement, and connect with skill-matched
            candidates.
          </p>
          <div className="mt-7 flex justify-center">
            <Link
              href="/employer-signup"
              className="inline-flex items-center justify-center rounded-[8px] bg-white px-6 sm:px-7 py-2.5 sm:py-3 text-[16px] sm:text-[16px] font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.35)]"
            >
              Create Employer Account
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center bg-white h-[495px]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-0 flex flex-col items-center gap-6">
          <div className="text-center max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[60px] font-bold font-[800] text-slate-900">
              Start Exploring Better{" "}
              <span className="text-(--job-post-button-bg-to)">Opportunities</span> Today
            </h2>
            <p className="mt-3 text-[13px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-slate-600">
              Join thousands of job seekers finding their dream roles through Jobito&apos;s smart
              job feed.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/candidate/jobs"
              className="rounded-[8px] bg-(--job-post-button-bg-to) px-6 sm:px-8 py-2.5 sm:py-3 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.3)] hover:bg-(--navbar-text-color) transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/employer-signin"
              className="rounded-[8px] border border-(--job-post-button-bg-to)/50 bg-white/90 px-6 sm:px-8 py-2.5 sm:py-3 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-semibold text-(--job-post-button-bg-to) hover:bg-(--job-post-button-bg-to)/5 transition-colors"
            >
              Join as Employer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
