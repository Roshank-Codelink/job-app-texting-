import { cn } from "@/lib/utils";

interface AILoaderProps {
    message?: string;
}

export default function AILoader({ message = "Polishing your post with AI — keeping your tone, fixing the rough edges..." }: AILoaderProps) {
    return (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-lg rounded-md flex flex-col items-center justify-center overflow-hidden">
            {/* Horizontal Flashlight Effect */}
            <div 
                className="absolute inset-0 opacity-30 rounded-md"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.4) 50%, transparent 100%)',
                    animation: 'aiFlashlight 2s ease-in-out infinite',
                }}
            ></div>
            
            {/* AI Thinking Text with Animated Dots */}
            <div className="text-center w-full px-6 flex flex-col items-center justify-center relative z-10">
                <h3 className="text-base font-semibold bg-gradient-to-r from-[#38bdf8] to-[#2dd4bf] bg-clip-text text-transparent mb-2 flex items-center justify-center gap-1">
                    <span>AI Thinking</span>
                    <span className="flex gap-0.5">
                        <span 
                            className="inline-block w-1 h-1 rounded-full bg-[#38bdf8]"
                            style={{
                                animation: 'aiBounce 1.4s ease-in-out infinite',
                                animationDelay: '0s'
                            }}
                        ></span>
                        <span 
                            className="inline-block w-1 h-1 rounded-full bg-[#2dd4bf]"
                            style={{
                                animation: 'aiBounce 1.4s ease-in-out infinite',
                                animationDelay: '0.2s'
                            }}
                        ></span>
                        <span 
                            className="inline-block w-1 h-1 rounded-full bg-[#14b8a6]"
                            style={{
                                animation: 'aiBounce 1.4s ease-in-out infinite',
                                animationDelay: '0.4s'
                            }}
                        ></span>
                    </span>
                </h3>
                <p className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
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

