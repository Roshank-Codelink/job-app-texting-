import {
  ShieldCheck,
  Target,
  Eye,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  const values = [
    {
      title: "Transparency First",
      description: "No hidden fees, no fake jobs, no misleading information. Complete clarity in every interaction.",
    },
    {
      title: "Quality Over Quantity",
      description: "We prioritize meaningful connections over mass applications. Every match matters.",
    },
    {
      title: "Continuous Innovation",
      description: "Constantly evolving our platform with cutting-edge AI to improve hiring outcomes.",
    },
  ];

  return (
    <div className="min-h-screen bg-(--navbar-bg-parent)">
      {/* Hero Section - Modern & Clean */}
      <section className="relative pt-20 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-(--navbar-bg-button) via-(--navbar-bg-parent) to-(--signin-bg-color-to) opacity-50">
           <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-(--job-post-button-bg-from) rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-(--job-post-button-bg-to) rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-(--profile-border-color) mb-8">
              <span className="w-2 h-2 rounded-full bg-(--job-post-button-bg-from) animate-pulse" />
              <span className="text-sm font-medium text-(--sidebar-menu-icone-color)">
                Trusted by 5,000+ companies worldwide
              </span>
            </div> */}

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-(--navbar-logo-text-color) mb-6 tracking-tight">
              Revolutionizing{" "}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to)">
                  Hiring
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 0 L100 12 L0 12 Z"
                    className="fill-(--job-post-button-bg-from)/20"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-(--sidebar-menu-icone-color) mb-10 max-w-2xl mx-auto leading-relaxed">
              Jobito combines AI technology with human expertise to create a hiring platform 
              that's fast, fair, and completely transparent.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/employer/dashboard"
                className="group px-8 py-4 bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-(--job-post-button-bg-from)/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/"
                className="px-8 py-4 bg-white border border-(--job-post-button-border-color) text-(--profile-menu-text-color) rounded-xl font-semibold hover:bg-(--navbar-bg-button) transition-all duration-300 text-center"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Zigzag Layout */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          
          {/* Item 1: AI-Powered Matching */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-24 md:mb-32">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-(--job-post-button-bg-from)/10 -translate-x-4 -translate-y-4 rounded-3xl" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)" }}></div>
              <div className="relative z-10 w-full aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl" style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0% 100%)" }}>
                 <img 
                   src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" 
                   alt="AI Matching" 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                 />
              </div>
            </div>
            
            {/* Text Side */}
            <div className="w-full md:w-1/2">
              <span className="text-sm font-bold tracking-wider text-(--navbar-text-color) uppercase mb-2 block">Smart Technology</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--navbar-logo-text-color) mb-6 leading-tight">
                AI-Powered Matching
              </h2>
              <p className="text-lg text-(--sidebar-menu-icone-color) mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-(--sidebar-menu-icone-color) mb-8 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          {/* Item 2: Verified Jobs */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20 mb-24 md:mb-32">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative">
               <div className="absolute top-0 right-0 w-full h-full bg-(--signin-bg-color-to) translate-x-4 translate-y-4 rounded-3xl" style={{ clipPath: "polygon(0 0, 100% 10%, 100% 100%, 10% 90%)" }}></div>
               <div className="relative z-10 w-full aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl" style={{ clipPath: "polygon(0 0, 100% 10%, 100% 100%, 10% 90%)" }}>
                 <img 
                   src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2032" 
                   alt="Verified Jobs" 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                 />
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2">
              <span className="text-sm font-bold tracking-wider text-emerald-600 uppercase mb-2 block">Trust & Safety</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--navbar-logo-text-color) mb-6 leading-tight">
                100% Verified Jobs & Companies
              </h2>
              <p className="text-lg text-(--sidebar-menu-icone-color) mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-(--sidebar-menu-icone-color) mb-8 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          {/* Item 3: Real-Time Updates */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-24 md:mb-32">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-(--job-post-button-bg-to)/10 -translate-x-4 -translate-y-4 rounded-3xl" style={{ clipPath: "polygon(20% 0%, 100% 0, 100% 100%, 0% 100%, 0% 20%)" }}></div>
              <div className="relative z-10 w-full aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl" style={{ clipPath: "polygon(20% 0%, 100% 0, 100% 100%, 0% 100%, 0% 20%)" }}>
                 <img 
                   src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1974" 
                   alt="Real Time" 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                 />
              </div>
            </div>
            
            {/* Text Side */}
            <div className="w-full md:w-1/2">
              <span className="text-sm font-bold tracking-wider text-(--navbar-text-color) uppercase mb-2 block">Speed & Efficiency</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--navbar-logo-text-color) mb-6 leading-tight">
                Real-Time Updates
              </h2>
              <p className="text-lg text-(--sidebar-menu-icone-color) mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-(--sidebar-menu-icone-color) mb-8 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          {/* Item 4: Precision Hiring */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative">
               <div className="absolute top-0 right-0 w-full h-full bg-(--job-post-button-bg-from)/10 translate-x-4 translate-y-4 rounded-3xl" style={{ clipPath: "polygon(0 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)" }}></div>
               <div className="relative z-10 w-full aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl" style={{ clipPath: "polygon(0 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)" }}>
                 <img 
                   src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2070" 
                   alt="Precision Hiring" 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                 />
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2">
              <span className="text-sm font-bold tracking-wider text-(--navbar-text-color) uppercase mb-2 block">Targeted Results</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--navbar-logo-text-color) mb-6 leading-tight">
                Precision Hiring
              </h2>
              <p className="text-lg text-(--sidebar-menu-icone-color) mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg text-(--sidebar-menu-icone-color) mb-8 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission - Split Layout */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--navbar-bg-button) border border-(--job-post-button-bg-from)/20 mb-6">
                <Target size={16} className="text-(--navbar-text-color)" />
                <span className="text-sm font-semibold text-(--navbar-text-color)">Our Purpose</span>
              </div>

              <h2 className="text-4xl font-bold text-(--navbar-logo-text-color) mb-6">
                Building the future of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to)">work</span>
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-(--navbar-bg-button) rounded-xl flex items-center justify-center text-(--navbar-text-color)">
                    <Eye size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-(--navbar-logo-text-color) mb-2">Our Vision</h3>
                    <p className="text-(--sidebar-menu-icone-color)">
                      To create a world where finding the right job or candidate is effortless, 
                      transparent, and based on merit - not luck.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-(--navbar-logo-text-color) mb-2">Our Mission</h3>
                    <p className="text-(--sidebar-menu-icone-color)">
                      To empower every professional and company with AI-driven tools that make 
                      hiring faster, fairer, and more human.
                    </p>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div className="mt-10 pt-10 border-t border-(--profile-border-color)">
                <h3 className="text-lg font-semibold text-(--navbar-logo-text-color) mb-4">Our Core Values</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {values.map((value, index) => (
                    <div key={index} className="text-center p-4 bg-(--Profile-hover-bg) rounded-xl">
                      <div className="text-sm font-medium text-(--navbar-logo-text-color) mb-1">{value.title}</div>
                      <p className="text-xs text-(--sidebar-menu-icone-color)">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image/Stats */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) rounded-3xl transform rotate-3 opacity-10" />
              <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-(--profile-border-color)">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-(--navbar-bg-button) rounded-2xl">
                    <div className="text-4xl font-bold text-(--navbar-text-color) mb-2">98%</div>
                    <div className="text-sm text-(--sidebar-menu-icone-color)">Satisfaction Rate</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-2xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                    <div className="text-sm text-(--sidebar-menu-icone-color)">Support Available</div>
                  </div>
                  <div className="text-center p-6 bg-emerald-50 rounded-2xl">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">15min</div>
                    <div className="text-sm text-(--sidebar-menu-icone-color)">Average Response</div>
                  </div>
                  <div className="text-center p-6 bg-amber-50 rounded-2xl">
                    <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
                    <div className="text-sm text-(--sidebar-menu-icone-color)">Industries</div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mt-8 p-6 bg-(--Profile-hover-bg) rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) rounded-full flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div>
                      <div className="font-semibold text-(--navbar-logo-text-color)">John Doe</div>
                      <div className="text-sm text-(--sidebar-menu-icone-color)">CEO, TechStart</div>
                    </div>
                  </div>
                  <p className="text-(--sidebar-menu-icone-color) italic">
                    "Jobito transformed how we hire. Found our best engineering talent in just 2 weeks!"
                  </p>
                  <div className="flex gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to transform your hiring?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10">
              Join thousands of companies already using Jobito to find their next great hire.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/employer/signup"
                className="px-8 py-4 bg-white text-(--navbar-text-color) rounded-xl font-semibold hover:bg-(--navbar-bg-button) transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/employer/contact"
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Talk to Sales
              </Link>
            </div>

            <p className="text-sm text-blue-200 mt-8">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
