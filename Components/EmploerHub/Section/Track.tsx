import { AiOutlineEye, AiFillHeart, AiOutlineCheck, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
export default function Track() {
    return (
        <section className="w-full bg-[#f9fafb] py-10 sm:py-14 md:py-20">
            <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 md:px-8">
                <div className="text-center">
                    <h2 className="text-[22px] sm:text-[30px] md:text-[36px] font-bold font-[800] text-[#111827] mb-[16px] sm:mb-[20px] md:mb-[24px]">
                        Track Real Candidate Interest
                    </h2>
                    <p className="mt-2 sm:mt-3 text-[13px] sm:text-[15px] md:text-[18px] text-[#4b5563] max-w-2xl mx-auto">
                        Monitor engagement in real-time. See exactly how candidates are interacting
                        with your job post and manage your hiring pipeline.
                    </p>
                </div>

                <div className="mt-8 sm:mt-10 w-full max-w-[1024px] mx-auto rounded-3xl bg-white border border-[#E5E7EB] shadow-[0_24px_60px_rgba(15,23,42,0.10)] px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:pt-12 md:pb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pb-5 sm:pb-6 border-b border-[#E5E7EB]">
                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="h-15 w-15 rounded-full bg-[#EEF6FF] flex items-center justify-center">
                                <AiOutlineEye className="h-8 w-8 text-(--job-post-button-bg-to)" />
                            </div>
                            <div>
                                <div className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#111827]">
                                    1,240
                                </div>
                                <div className="text-[11px] sm:text-[12px] md:text-[14px] font-medium font-[500] text-[#6B7280]">
                                    TOTAL IMPRESSIONS
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="h-15 w-15 rounded-full bg-[#FEF2F2] flex items-center justify-center">
                                <AiFillHeart className="h-8 w-8 text-[#EF4444]" />
                            </div>
                            <div>
                                <div className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#111827]">
                                    86
                                </div>
                                <div className="text-[11px] sm:text-[12px] md:text-[14px] font-medium font-[500] text-[#6B7280]">
                                    TOTAL LIKES
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="h-15 w-15 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                                <BsBookmarkFill className="h-8 w-8 text-(--job-post-button-bg-to)" />
                            </div>
                            <div>
                                <div className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#111827]">
                                    42
                                </div>
                                <div className="text-[11px] sm:text-[12px] md:text-[14px] font-medium font-[500] text-[#6B7280]">  
                                    TOTAL SAVES
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center gap-2">
                            <div className="h-15 w-15 rounded-full bg-[#ECFDF3] flex items-center justify-center">
                                <AiOutlineCheck className="h-8 w-8 text-[#22C55E]" />
                            </div>
                            <div>
                                <div className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-[#111827]">
                                    Active
                                </div>
                                <div className="text-[11px] sm:text-[12px] md:text-[14px] font-medium font-[500] text-[#6B7280]">
                                    STATUS
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <button className="cursor-pointer inline-flex items-center gap-2 rounded-[5px] bg-[#16A34A] px-6 sm:px-7 py-2.5 text-[14px] sm:text-[16px] font-semibold text-white hover:bg-[#15803D] transition-colors">
                            <FaUserCheck className="h-5 w-5" />
                            <span>Mark as Hired</span>
                        </button>
                        <button className="cursor-pointer inline-flex items-center gap-2 rounded-[5px] border border-[#E5E7EB] bg-white px-6 sm:px-7 py-2.5 text-[14px] sm:text-[16px] font-semibold text-[#111827] hover:bg-[#F9FAFB] transition-colors">
                            <AiOutlineEyeInvisible className="h-5 w-5 text-[#4B5563] " />
                            <span>Close Job</span>
                        </button>
                        <button className="cursor-pointer inline-flex items-center gap-2 rounded-[5px] border border-[#E5E7EB] bg-white px-6 sm:px-7 py-2.5 text-[14px] sm:text-[16px] font-semibold text-[#EF4444] hover:bg-[#FEE2E2] hover:border-[#EF4444] transition-colors">
                            <FiTrash2 className="h-5 w-5" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
