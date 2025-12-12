import { cn } from "@/lib/utils";

interface AILoaderProps {
    message?: string;
}

export default function AILoader({ message = "Polishing your post with AI — keeping your tone, fixing the rough edges..." }: AILoaderProps) {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-(--sidebar-bg-color) rounded-md flex items-center justify-center">
            {/* Horizontal Flashlight Effect */}
            <div 
                className="absolute inset-0 opacity-20 rounded-md"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.3) 50%, transparent 100%)',
                    animation: 'aiFlashlight 2s ease-in-out infinite',
                }}
            ></div>
            
            {/* AI Thinking Text with Animated Dots */}
            <div className="text-center px-4 relative z-10 flex flex-col items-center gap-2">
                <h3 className="text-base font-semibold bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) bg-clip-text text-transparent flex items-center justify-center gap-2">
                    <span>AI Thinking</span>
                    <span className="flex gap-1">
                        <span 
                            className="inline-block w-2 h-2 rounded-full bg-(--job-post-button-bg-from)"
                            style={{
                                animation: 'aiBounce 1.4s ease-in-out infinite',
                                animationDelay: '0s'
                            }}
                        ></span>
                        <span 
                            className="inline-block w-2 h-2 rounded-full bg-(--job-post-button-bg-to)"
                            style={{
                                animation: 'aiBounce 1.4s ease-in-out infinite',
                                animationDelay: '0.2s'
                            }}
                        ></span>
                        <span 
                            className="inline-block w-2 h-2 rounded-full bg-(--job-post-button-hover)"
                            style={{
                                animation: 'aiBounce 1.4s ease-in-out infinite',
                                animationDelay: '0.4s'
                            }}
                        ></span>
                    </span>
                </h3>
                <p className="text-sm text-gray-500 max-w-[320px] text-center leading-relaxed">
                    {message}
                </p>
            </div>
            
            {/* Inline Styles for Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes aiBounce {
                        0%, 80%, 100% {
                            transform: translateY(0);
                            opacity: 0.5;
                        }
                        40% {
                            transform: translateY(-8px);
                            opacity: 1;
                        }
                    }
                    
                    @keyframes aiFlashlight {
                        0% {
                            transform: translateX(-100%);
                            opacity: 0;
                        }
                        50% {
                            opacity: 0.4;
                        }
                        100% {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                    }
                `
            }} />
        </div>
    );
}

