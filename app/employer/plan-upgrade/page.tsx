"use client";
import { useSession } from "next-auth/react";

import { Check, ShieldCheck, ArrowRight, Sparkles, LayoutGrid, BarChart, BadgeCheck, Star } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { EmployerCustomerid, EmployerpaymentCheckout } from "@/api_config/EmployerInfoApi/payment";
import { useEffect, useRef, useState } from "react";

export default function PlanUpgrade() {
  
    const [customerId, setCustomerId] = useState("");
    const { data: session } = useSession();
    const userId = session?.user?.id;
   const handlePaymentCheckout = async (userId: string, customerId: string) => {
  if (!userId) {
    console.error("User ID is missing");
    return;
  }

  const priceId = "price_1T0JTU0pN4f8d8BYPI96OhtN";

  try {
    const paymentResponse = await EmployerpaymentCheckout(userId, priceId, customerId);

    console.log("Payment Response:", paymentResponse);

    if (paymentResponse?.data?.checkoutUrl) {
      window.location.href = paymentResponse?.data.checkoutUrl;
    } else {
      console.error("Checkout URL not found");
    }
  } catch (error) {
    console.error("Payment error:", error);
  }
};



const hasCalled = useRef(false);

useEffect(() => {
  if (hasCalled.current) return;
  hasCalled.current = true;

  const responseApi = async () => {
    const response = await EmployerCustomerid(
      session?.user?.email as string,
      session?.user?.name as string
    );
    setCustomerId(response?.data?.customerId || "");
    console.log(response);
  };

  responseApi();
}, []);
  

  const features = [
    {
      title: "Unlimited Job Listings",
      desc: "Post without boundaries and reach more candidates.",
      icon: <LayoutGrid className="w-5 h-5" />
    },
    {
      title: "AI Match Engine",
      desc: "Smart matching for your specific requirements.",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      title: "Priority Analytics",
      desc: "Track performance with real-time metrics.",
      icon: <BarChart className="w-5 h-5" />
    },
    {
      title: "Employer Branding",
      desc: "Stand out with a verified profile badge.",
      icon: <BadgeCheck className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-white">
       {/* Balanced Top Banner Section */}
      <div className="w-full bg-[#f8fafc] border-b border-slate-100 py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Star className="w-3 h-3 fill-current" />
              Elevate Your Experience
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Transform Your Recruitment <br /> with <span className="text-(--navbar-text-color)">Jobito Premium</span>
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md mb-6">
              Ditch limitations and embrace a unified platform designed for growth. Everything you need to hire faster and smarter.
            </p>
            
            {/* Professional Avatars */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&q=80"
                ].map((url, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm transition-transform hover:scale-110 hover:z-10 cursor-pointer">
                    <img 
                      src={url} 
                      alt="Professional User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400 shadow-sm">
                  +500
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trusted by 500+ Top Employers</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center md:items-start lg:items-end">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex flex-col items-end">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-none">₹1,100</span>
                <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">One-Time Payment</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-8 font-medium italic">Lifetime access, zero recurring fees.</p>
            <Button onClick={() => handlePaymentCheckout(userId as string, customerId)} className="h-14 px-12 bg-(--navbar-text-color) cursor-pointer hover:bg-(--navbar-text-color) hover:brightness-105 text-white rounded-2xl font-black text-base shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)] transition-all flex items-center gap-3 group">  
              Upgrade to Premium
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <div className="mt-8 flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest opacity-60">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Secure Checkout via Stripe
            </div>
          </div>
        </div>
      </div>

      {/* Balanced Features Grid */}
      <div className="w-full py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-(--navbar-text-color) group-hover:bg-blue-50 transition-all duration-300">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Included in your plan</h4>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {["24/7 Priority Support", "Custom Job Forms", "Candidate CSV Export", "Team Collaboration"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-emerald-500" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

