 "use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PenTool, X, Wand2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TurndownService from "turndown";
import { AIJobPostAPI, PostJobAPI } from "@/api/JobPostApi/JobPostApi";
import AILoader from "./AILoader";
import PostingLoader from "./PostingLoader";





export default function JobPostForm({ refreshJobs }: { refreshJobs: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [markdownText, setMarkdownText] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [isAILoading, setIsAILoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const MAX_CHARACTERS = 1500;
    const DiableCharacterCount = 20;
    const DiableWordCount = 20;
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

    // ⭐ FINAL WORKING TIPTAP CONFIG
    const editor = useEditor({
        immediatelyRender: false,   // 🔥 REQUIRED FIX FOR SSR ERROR

        extensions: [
            StarterKit.configure({
                bold: {},  // ✅ Enable bold
                italic: {},  // ✅ Enable italic
                strike: false,
                heading: false,
                orderedList: {},  // ✅ Enable lists
                bulletList: {},  // ✅ Enable bullet lists
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
            const html = editor.getHTML();
            const markdown = turndownService.turndown(html);
            characterCount == 0 && setError("")

            // Get plain text character count (without HTML tags)
            const textContent = editor.getText();
            const currentCount = textContent.length;

            // Calculate word count (properly handle spaces)
            const trimmedText = textContent.trim();
            const words = trimmedText.split(/\s+/).filter(word => word.length > 0);
            setWordCount(words.length);

            // Limit to MAX_CHARACTERS
            if (currentCount > MAX_CHARACTERS) {
                // Truncate content if exceeds limit
                const truncatedText = textContent.substring(0, MAX_CHARACTERS);
                editor.commands.setContent(truncatedText);
                setCharacterCount(MAX_CHARACTERS);
            } else {
                setCharacterCount(currentCount);
            }

            setMarkdownText(markdown); // 🔥 Save to state
        },

        onCreate({ editor }) {
            // Initialize character count and word count when editor is created
            const textContent = editor.getText();
            setCharacterCount(textContent.length);
            const trimmedText = textContent.trim();
            const words = trimmedText.split(/\s+/).filter(word => word.length > 0);
            setWordCount(words.length);
        },
        
    });

    // Disable editor when AI is loading or submitting
    useEffect(() => {
        if (!editor) return;
        editor.setEditable(!isAILoading && !isSubmitting);
    }, [editor, isAILoading, isSubmitting]);



 // ⭐ STEP 3 — Apply To TipTap
 const handleGenerateAI = async () => {
    if (!editor) return;
    setError("");
    setIsAILoading(true);
    // ✅ Get FULL HTML including bold, italic, lists, etc.
    //  let html=`<p>🚨 <strong>Urgent Hiring – Flutter Developer</strong> 🚨</p><p>👉 <strong>Position:</strong> Flutter Developer</p><p>💼 <strong>Experience:</strong> 0 – 1.5 Years</p><p>📍 <strong>Location:</strong> Mota Varachha, Surat (On-site Only)</p><p>🎓 <strong>Education:</strong> B.E / B.Tech / BCA / MCA</p><p>🗣️ <strong>Communication:</strong> Good communication skills required</p><p>⚠️ <strong>Please Note:</strong></p><ul><li><p>Only <strong>local Surat candidates</strong> will be considered.</p></li></ul><p>📧 <strong>To Apply:</strong><br>Send your updated resume to: <a target="_blank" rel="noopener noreferrer nofollow" href="mailto:hrskytouchinfotech1@gmail.com"><strong>hrskytouchinfotech1@gmail.com</strong></a></p><p>📞 <strong>Contact:</strong><br><strong>+91 81408 81209</strong></p>`
   
   
    // editor.commands.setContent(html);

    const htmlContent = editor.getHTML();
   
  
    try {
        const response = await AIJobPostAPI({
            description: htmlContent,
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
            editor.commands.setContent(responseData?.data?.message || "");
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
    const words = textContent.split(/\s+/).filter(word => word.length > 0);
    if (words.length < DiableWordCount) {
        setError(`Job description must be at least ${DiableWordCount} words long.`);
        return;
    }

    // ✅ Get FULL FORMATTED HTML (bold, italic, lists… preserved)
    const html = editor.getHTML();

    try {
        setIsSubmitting(true);
        setError("");

        const response = await PostJobAPI({
            description: html,   // ⭐ SEND HTML DIRECTLY (NO MARKDOWN)
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
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                        onClick={() => setIsExpanded(true)}
                    >
                        <Image
                            src={userImageUrl}
                            alt="User"
                            width={40}
                            height={40}
                            className="rounded-[8px] object-cover w-10 h-10"
                        />

                        <div className="flex-1 text-base text-gray-400">
                            Create a job post...
                        </div>

                        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <PenTool className="h-4 w-4 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* EXPANDED FORM */}
                <div
                    className={cn(
                        "transition-all duration-500 ease-in-out overflow-hidden",
                        isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-[8px] object-cover w-10 h-10"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-[#1E293B]">
                                        New Job Post
                                    </h2>
                                    <p className="text-[12px] text-[#64748b] font-semibold">
                                        Sarah Connor • HR Manager
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 cursor-pointer"
                                onClick={() => setIsExpanded(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* ⭐ TIPTAP EDITOR */}
                        <div className={cn(
                            "relative border rounded-md mb-2",
                            (isAILoading || isSubmitting) 
                                ? "h-[300px] overflow-hidden" 
                                : "min-h-[200px] max-h-[300px] overflow-hidden"
                        )}>
                            <div className={cn(
                                "p-3",
                                (isAILoading || isSubmitting) 
                                    ? "h-full overflow-hidden pointer-events-none" 
                                    : "min-h-[200px] max-h-[300px] overflow-y-auto"
                            )}>
                                {editor && <EditorContent editor={editor}  />}
                            </div>

                            {/* AI Loading Overlay - Covers entire editor area */}
                            {isAILoading && <AILoader />}

                            {/* Posting Loader Overlay - Covers entire editor area */}
                            {isSubmitting && <PostingLoader message="Please wait while we post your job..." />}
                        </div>
                       

                        {/* Character Counter */}
                        <div className="flex justify-end mb-4">
                            <span className={cn(
                                "text-sm",
                                characterCount > MAX_CHARACTERS
                                    ? "text-red-500 font-semibold"
                                    : characterCount > MAX_CHARACTERS * 0.9
                                        ? "text-orange-500"
                                        : "text-gray-500"
                            )}>
                                {MAX_CHARACTERS - characterCount} characters remaining
                            </span>
                        </div>

                        {/* Error Message - Above AI Button */}
                      {error && (
                        <p className="text-sm text-gray-500">{error}</p>
                      )}
     
                          
                       
                        {/* FOOTER */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="default"
                                    className="bg-gradient-to-r cursor-pointer from-[#38bdf8] to-[#2dd4bf] hover:from-[#0ea5e9] hover:to-[#14b8a6] text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleGenerateAI}
                                    disabled={isAILoading || wordCount < DiableWordCount}
                                >
                                    <Wand2 className={cn("h-4 w-4 mr-2", isAILoading && "animate-spin")} />
                                    {isAILoading ? "AI Generating..." : "Generate With AI"}
                                </Button>
                                {wordCount < DiableWordCount && (
                                    <p className="text-sm font-medium text-gray-500">
                                        {wordCount}/{DiableWordCount}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    className="bg-transparent shadow-none px-6 py-2 border border-slate-200 text-slate-600 font-medium rounded-lg hover:bg-slate-50 text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || isAILoading || wordCount < DiableWordCount}
                                >
                                    {isSubmitting ? "Posting..." : "Post Job"}
                                </Button>
                                {wordCount < DiableWordCount && (
                                    <p className="text-sm font-medium text-gray-500">
                                        {wordCount}/{DiableWordCount}
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