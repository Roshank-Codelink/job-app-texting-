"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PenTool, X, Wand2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

import { EditorContent, useEditor,useEditorState  } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TurndownService from "turndown";
import { AIJobPostAPI, PostJobAPI } from "@/api/JobPostApi/JobPostApi";
import AILoader from "./AILoader";
import PostingLoader from "./PostingLoader";
import { CharacterCount } from '@tiptap/extensions'
import { LimitPasteHTML } from "@/utils/extensions/LimitPasteHTML";







export default function JobPostForm({ refreshJobs }: { refreshJobs: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [markdownText, setMarkdownText] = useState("");
    const [isAILoading, setIsAILoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const DiableWordCount = 20;
    const lastValidContentRef = useRef<string>("");

    const MAX_CHARACTERS = 1500;

    // Configure TurndownService for all formatting types with proper line breaks
    const turndownService = new TurndownService({
        headingStyle: 'atx', // Use # for headings
        bulletListMarker: '-', // Use - for bullet lists
        codeBlockStyle: 'fenced', // Use ``` for code blocks
    });

    // Override paragraph rule to preserve single line breaks
    turndownService.addRule('paragraph', {
        filter: 'p',
        replacement: function (content: string, node: any) {
            // If paragraph is inside a list, don't add extra spacing
            if (node.parentElement?.tagName === 'LI') {
                return content.trim() + '\n';
            }
            return content.trim() ? '\n\n' + content.trim() + '\n\n' : '';
        }
    });

    // Ensure line breaks are preserved
    turndownService.addRule('lineBreak', {
        filter: 'br',
        replacement: function () {
            return '\n';
        }
    });



  const editor = useEditor({
        immediatelyRender: false,   // 🔥 REQUIRED FIX FOR SSR ERROR
      
        extensions: [
            LimitPasteHTML.configure(),
            StarterKit.configure({
                bold: {},  // ✅ Enable bold
                italic: {},  // ✅ Enable italic
                strike: false,
                heading: false,
                orderedList: {},  // ✅ Enable lists
                bulletList: {},  // ✅ Enable bullet lists
            }),
            CharacterCount.configure({
                limit: MAX_CHARACTERS,
                mode: "textSize",
            }),
            Placeholder.configure({
                placeholder: "Describe the role, responsibilities, and requirements...",
            }),
        ],

        content: "",
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm max-w-none min-h-[200px] w-full outline-none text-base focus:outline-none",
                'data-placeholder': "Describe the role, responsibilities, and requirements...",
            },
        },

        onUpdate({ editor }) {
            // Store current valid HTML content
            const html = editor.getHTML();
            lastValidContentRef.current = html;

            // Process markdown
            const markdown = turndownService.turndown(html);
            setMarkdownText(markdown);

            const textContent = editor.getText();
            if (textContent.length === 0) {
                setError("");
            }
        },

        onCreate({ editor }) {
            // Store initial valid content
            lastValidContentRef.current = editor.getHTML();
        },

    });


   

    const { charactersCount, wordsCount } = useEditorState({
        editor,
        selector: context => ({
          charactersCount: context?.editor?.storage?.characterCount?.characters() ?? 0,
          wordsCount: context?.editor?.storage?.characterCount?.words() ?? 0,
        }),
      }) ?? { charactersCount: 0, wordsCount: 0 }


    // Disable editor when AI is loading or submitting
    useEffect(() => {
        if (!editor) return;
        editor.setEditable(!isAILoading && !isSubmitting);
    }, [editor, isAILoading, isSubmitting]);

    const cleanTipTapHTML = (html: string): string => {
        return html
            .replace(/<p>(\s|&nbsp;)*<\/p>/g, "<br>") // Replace empty lines with <br>
        //   .replace(/(<br>\s*){2,}/g, "<br>")       // Remove multiple <br>
        //   .trim();
    };

    // ⭐ STEP 3 — Apply To TipTap
    const handleGenerateAI = async () => {
        if (!editor) return;
        setError("");
        setIsAILoading(true);
        // ✅ Get FULL HTML including bold, italic, lists, etc.

        // let html = `<p> <strong>#Urgent Hiring (Immediate Joiners Needed!) </strong> \nWe are urgently looking for individuals who can start immediately at an American company.\n\nApply for Referral: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://lnkd.in/gczHBv7t\"><strong>https://lnkd.in/gczHBv7t</strong></a>\n\nLast Date: 15/12/2025\n\nWe welcome both <strong>#Freshers</strong> and <strong>#ExperiencedProfessionals</strong>.\n\n<strong>Open positions:</strong> Full Stack Developer - <strong>#Frontend</strong>, <strong>#Backend</strong> Developer, <strong>#Software</strong> Developer, <strong>#Web</strong> Designer, Graphic Designer, Social Media Manager, Business Development Associate, &amp; <strong>#HR</strong>\n\n<strong>#Experience</strong>: 0-3 years\n\n<strong>#Working</strong> hours: Flexible\n\n<strong>#Income</strong>: 24k - 85k / Monthly in hand\n\n<strong>#Location</strong>: Remote\n\nWork schedule: 5 days a week. Training will be provided for <strong>#Freshers</strong>.\n\n<strong>Note</strong>: Please respond only to personal replies, not anonymous messages.\n\nComment \"<strong>#Interested</strong>\" to get shortlisted within 24 hours.</p>`


        // editor.commands.setContent(html);

        const htmlContent = editor.getHTML();
        const cleanedHTML = cleanTipTapHTML(htmlContent);

        console.log("htmlContent", htmlContent);


        try {
            const response = await AIJobPostAPI({
                description: cleanedHTML,
            });

            // console.log("API Response >>>>>>>>>>>:", response);

            // Handle API wrapper error (network/HTTP errors)
            // Response structure: { error: true, data: { message: "...", success: false } }
            if (response.error) {
                const responseData = response.data as any;
                // Error message is in response.data.message (not response.data.data.message)
                const errorMessage = responseData?.message || responseData?.data?.message || "An error occurred. Please try again.";

                setError(errorMessage);
                setIsAILoading(false);

            }



            // Success case - set content
            if (!response.error) {
                const responseData = response.data;
                setIsAILoading(false);
                // setError("");
                const aiContent = responseData?.data?.message || "";
                editor.commands.setContent(aiContent);
                // Update the ref to store this as valid content
                lastValidContentRef.current = aiContent;
            }

        } catch (error) {
            console.error("API Error:", error);
            setError("An unexpected error occurred. Please try again.");
            setIsAILoading(false);
        }


    };




    const handleSubmit = async () => {
        if (!editor) return;

        setError("");

        // Get plain text just to check if empty (do not send this)
        const textContent = editor.getText().trim();
        if (!textContent) {
            setError("Job description cannot be empty. Please enter a job description.");
            return;
        }

        // Check minimum word count
        if (wordsCount < DiableWordCount) {
            setError(`Job description must be at least ${DiableWordCount} words long.`);
            return;
        }

        // ✅ Get FULL FORMATTED HTML (bold, italic, lists… preserved)
        const html = editor.getHTML();
        const cleanedHTML = cleanTipTapHTML(html);
        try {
            setIsSubmitting(true);
            setError("");

            const response = await PostJobAPI({
                description: cleanedHTML,   // ⭐ SEND HTML DIRECTLY (NO MARKDOWN)
            });

            refreshJobs();
            console.log("API Response:", response);

            const responseData = response.data;

            // Handle different error cases
            if (response.error || responseData?.error === true || responseData?.success === false) {
                setError(responseData?.message || "Failed to post job. Please try again.");
                return;
            }

            if ((responseData?.statusCode || response.statusCode) >= 400) {
                setError(responseData?.message || "Something went wrong.");
                return;
            }

            // Successful post
            if (responseData?.success === true || responseData?.statusCode === 200) {
                editor.commands.clearContent();
                lastValidContentRef.current = "";
                setIsExpanded(false);
                setError("");
            }

        } catch (error) {
            console.error("API Error:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const userImageUrl =
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face";

    return (
        <div className="w-full">
            <div
                className={cn(
                    "bg-white rounded-[20px] overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? " " : "shadow-sm hover:shadow-md"
                )}
            >
                {/* TOP SECTION */}
                <div
                    className={cn(
                        "transition-all duration-300 ease-in-out overflow-hidden",
                        isExpanded ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
                    )}
                >
                    <div
                        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 cursor-pointer"
                        onClick={() => setIsExpanded(true)}
                    >
                        <Image
                            src={userImageUrl}
                            alt="User"
                            width={40}
                            height={40}
                            className="rounded-[8px] object-cover w-8 h-8 sm:w-10 sm:h-10 shrink-0"
                        />

                        <div className="flex-1 text-sm sm:text-base text-gray-400 min-w-0">
                            <span className="truncate block">Create a job post...</span>
                        </div>

                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <PenTool className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* EXPANDED FORM */}
                <div
                    className={cn(
                        "transition-all duration-500 ease-in-out overflow-hidden",
                        isExpanded ? "max-h-[800px] sm:max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <div className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4 gap-2">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                <Image
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-[8px] object-cover w-8 h-8 sm:w-10 sm:h-10 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-base sm:text-lg font-semibold text-[#1E293B] truncate">
                                        New Job Post
                                    </h2>
                                    <p className="text-[10px] sm:text-[12px] text-[#64748b] font-semibold truncate">
                                        Sarah Connor • HR Manager
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 cursor-pointer shrink-0"
                                onClick={() => setIsExpanded(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* ⭐ TIPTAP EDITOR */}
                        <div className={cn(
                            "relative border rounded-md mb-2",
                            (isAILoading || isSubmitting)
                                ? "h-[250px] sm:h-[300px] overflow-hidden"
                                : "min-h-[180px] sm:min-h-[200px] max-h-[250px] sm:max-h-[300px] overflow-hidden"
                        )}>
                            <div className={cn(
                                "p-2 sm:p-3",
                                (isAILoading || isSubmitting)
                                    ? "h-full overflow-hidden pointer-events-none"
                                    : "min-h-[180px] sm:min-h-[200px] max-h-[250px] sm:max-h-[300px] overflow-y-auto"
                            )}>
                                {editor && <EditorContent editor={editor} />}
                            </div>

                            {/* AI Loading Overlay - Covers entire editor area */}
                            {isAILoading && <AILoader />}

                            {/* Posting Loader Overlay - Covers entire editor area */}
                            {isSubmitting && <PostingLoader message="Please wait while we post your job..." />}
                        </div>

                           {/* Character Count */}
                           <div className={cn(
                               "flex justify-end text-xs sm:text-sm font-medium",
                               charactersCount >= MAX_CHARACTERS ? "text-red-600" : "text-gray-500"
                           )}>
                            {charactersCount}/{MAX_CHARACTERS} characters
                           </div>
                        {/* Error Message - Above AI Button */}
                        {error && (
                            <p className="text-xs sm:text-sm text-gray-500 wrap-break-word">{error}</p>
                        )}



                        {/* FOOTER */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial">
                                <Button
                                    variant="default"
                                    className="bg-gradient-to-r cursor-pointer from-[#38bdf8] to-[#2dd4bf] hover:from-[#0ea5e9] hover:to-[#14b8a6] text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base px-3 sm:px-4 py-2 flex-1 sm:flex-initial whitespace-nowrap"
                                    onClick={handleGenerateAI}
                                    disabled={isAILoading || wordsCount < DiableWordCount}
                                >
                                    <Wand2 className={cn("h-4 w-4 sm:mr-2", isAILoading && "animate-spin")} />
                                    <span className="hidden sm:inline">{isAILoading ? "AI Generating..." : "Generate With AI"}</span>
                                    <span className="sm:hidden">{isAILoading ? "Generating..." : "Generate AI"}</span>
                                </Button>
                                {wordsCount < DiableWordCount && (
                                    <p className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                                        {wordsCount}/{DiableWordCount}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial justify-end">
                                <Button
                                    variant="outline"
                                    className="bg-transparent shadow-none px-3 sm:px-6 py-2 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-initial whitespace-nowrap"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || isAILoading || wordsCount < DiableWordCount}
                                >
                                    {isSubmitting ? "Posting..." : "Post Job"}
                                </Button>
                                {wordsCount < DiableWordCount && (
                                    <p className="text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                                        {wordsCount}/{DiableWordCount}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 