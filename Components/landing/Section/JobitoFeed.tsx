import { BookOpen, Headset, Target , PieChart , CreditCard, Palette, Megaphone, ArrowDownWideNarrow } from "lucide-react";


export default function JobitoFeed() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center py-10 md:py-12 bg-[#F8FAFC]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row items-start gap-10 lg:gap-16 lg:py-[96px]">
        <div className="w-full max-w-[520px]">
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold  text-[#0f172a] leading-tight">
            Not Just a Job List.
            <br />
            A{" "}
            <span className="text-[#2dd4bf]">
              Smart Job Feed.
            </span>
          </h2>
          <p className="mt-4 text-[18px] leading-[28px] sm:text-[18px] text-[#475569] max-w-2xl">
            Experience a dynamic feed that learns what you need.
            Prioritizing fresh opportunities and relevant skills.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-sm flex items-center justify-center shrink-0">
                <ArrowDownWideNarrow className="w-5 h-5 text-[#2dd4bf]" />
              </div>
              <div>
                <h4 className="text-[19px] font-bold font-[700] text-[#0F172A]">
                  Scroll-Based Browsing
                </h4>
                <p className="text-[14px] text-[#475569] mt-[4px] font-semibold">
                  Infinite scroll experience designed for rapid discovery and engagement.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-sm flex items-center justify-center shrink-0">
                <Target  className="w-5 h-5 text-[#2dd4bf]" />
              </div>
              <div>
                <h4 className="text-[19px] font-bold font-[700] text-[#0F172A]">
                  Skill-Based Ranking
                </h4>
                <p className="text-[14px] text-[#475569] mt-[4px] font-semibold">
                  Jobs are ranked by skill match percentage, ensuring you see the best fits first.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-sm flex items-center justify-center shrink-0">
                <PieChart  className="w-5 h-5 text-[#2dd4bf]" />
              </div>
              <div>
                <h4 className="text-[19px] font-bold font-[700] text-[#0F172A]">
                  Engagement Tracking
                </h4>
                <p className="text-[14px] text-[#475569] mt-[4px] font-semibold">
                  Track likes, saves, and impressions in real-time to gauge interest.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-2 flex-1 w-full">
          <div className="relative h-[440px] overflow-y-auto overflow-x-hidden pr-2 space-y-4 pl-[10px] opacity-95 custom-scrollbar">
            <div className="rounded-2xl bg-white/40 border border-[#E5E7EB]/70 px-5 py-4 shadow-sm opacity-80">
              <div className="flex gap-3">
                {/* Logo */}
                <div className="h-10 w-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-xs font-semibold text-[#4F46E5]">
                  DB
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[12px] text-[#94A3B8]">
                    <span className="font-medium text-[#64748B]">Dropbox</span>
                    <span>· 20 mins ago</span>
                  </div>
                  <h4 className="mt-1 text-[16px] font-semibold text-[#0F172A]">
                    Senior Backend Engineer
                  </h4>
                  <p className="mt-1 text-[12px] text-[#475569] leading-snug line-clamp-2">
                    Join our core infrastructure team to build scalable systems that power millions of users worldwide…
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[12px] opacity-80">
                    <span className="rounded-[8px] bg-[#F3F4F6] px-3 py-1 text-[#475569] ">Python</span>
                    <span className="rounded-[8px] bg-[#E5E7EB] px-3 py-1 text-[#475569]">Go</span>
                    <span className="rounded-[8px] bg-[#DCFCE7] px-3 py-1 text-[#16A34A] font-semibold">
                      95% Match
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/95 border border-[#E5E7EB]/90 px-5 py-5 scale-[1.02] ">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#020617] flex items-center justify-center text-xs font-semibold text-white">
                  U
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[12px] text-[#94A3B8]">
                    <span className="font-medium text-[#64748B]">Uber</span>
                    <span>· 1 hour ago</span>
                  </div>
                  <h4 className="mt-1 text-[16px] font-semibold text-[#0F172A]  ">
                    Data Scientist, Analytics
                  </h4>
                  <p className="mt-1 text-[12px] text-[#64748B] leading-snug line-clamp-2">
                    Analyze large datasets to derive actionable insights for product development and strategy…
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[12px] opacity-80">
                    <span className="rounded-[8px] bg-[#E5E7EB] px-3 py-1 text-[#475569]">SQL</span>
                    <span className="rounded-[8px] bg-[#E5E7EB] px-3 py-1 text-[#475569]">Python</span>
                    <span className="rounded-[8px] bg-[#DCFCE7] px-3 py-1 text-[#16A34A] font-semibold">
                      88% Match
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/40 border border-[#E5E7EB]/70 px-5 py-4 shadow-sm opacity-80">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#ECFDF3] flex items-center justify-center text-xs font-semibold text-[#16A34A]">
                  SP
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[12px] text-[#94A3B8]">
                    <span className="font-medium text-[#64748B]">Spotify</span>
                    <span>· 3 hours ago</span>
                  </div>
                  <h4 className="mt-1 text-[15px] font-semibold text-[#0F172A]">
                    Frontend Developer
                  </h4>
                  <p className="mt-1 text-[12px] text-[#94A3B8] leading-snug line-clamp-2">
                    We are looking for a creative frontend developer who is passionate about building beautiful UIs…
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
                    <span className="rounded-[8px] bg-[#E5E7EB] px-3 py-1 text-[#475569]">React</span>
                    <span className="rounded-[8px] bg-[#E5E7EB] px-3 py-1 text-[#475569]">TypeScript</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F8FAFC]/90 via-[#F8FAFC]/40 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8FAFC]/90 via-[#F8FAFC]/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
