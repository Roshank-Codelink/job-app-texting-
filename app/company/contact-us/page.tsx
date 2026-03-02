import { 
  Mail, 
  MapPin, 
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  CheckCircle,
  Twitter
} from "lucide-react";
import Link from "next/link";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-(--navbar-bg-parent) py-12 px-4 md:py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-(--navbar-logo-text-color) mb-4">
            Get in Touch <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to)">With Us</span>
          </h1>
          <p className="text-(--sidebar-menu-icone-color) max-w-2xl mx-auto text-lg">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        {/* Main Content Grid */}
        <div>
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Side: Contact Information Card */}
            <div className="lg:col-span-5 bg-(--navbar-logo-text-color) rounded-[1.5rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-between min-h-[600px]">
              {/* Decorative Circles */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-10 right-10 w-20 h-20 bg-(--job-post-button-bg-from)/20 rounded-full blur-xl pointer-events-none" />
              <div>
                <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                <p className="text-gray-300 mb-12 text-lg">
                  Fill up the form and our Team will get back to you within 24 hours.
                </p>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <Phone className="shrink-0 text-(--job-post-button-bg-from)" size={24} />
                    <p className="text-lg">+91 98765 43210</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="shrink-0 text-(--job-post-button-bg-from)" size={24} />
                    <p className="text-lg">support@jobito.com</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="shrink-0 text-(--job-post-button-bg-from)" size={24} />
                    <p className="text-lg leading-relaxed">
                      1st Floor, Tech Park Hub,<br />
                      Main Digital Road, Sector 45,<br />
                      Bengaluru 560001, India
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-12">
                 <div className="flex items-start gap-3 mb-12 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    <CheckCircle className="shrink-0 text-(--job-post-button-bg-from)" size={20} />
                    <p className="text-sm text-gray-300 leading-relaxed">
                      We guarantee 100% security of your information. We will not share the details you provide above with anyone.
                    </p>
                 </div>
                <div className="flex gap-6">
                  <Link href="#" className="hover:text-(--job-post-button-bg-from) transition-colors transform hover:scale-110">
                    <Linkedin size={24} />
                  </Link>
                  <Link href="#" className="hover:text-(--job-post-button-bg-from) transition-colors transform hover:scale-110">
                    <Instagram size={24} />
                  </Link>
                  <Link href="#" className="hover:text-(--job-post-button-bg-from) transition-colors transform hover:scale-110">
                    <Facebook size={24} />
                  </Link>
                  <Link href="#" className="hover:text-(--job-post-button-bg-from) transition-colors transform hover:scale-110">
                    <Twitter size={24} />
                  </Link>
                </div>
              </div>
            </div>
            {/* Right Side: Contact Form */}
            <div className="lg:col-span-7 p-6 md:p-12">
              <form className="space-y-8 h-full flex flex-col justify-center">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--sidebar-menu-icone-color) ml-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-(--job-post-button-bg-from) focus:ring-2 focus:ring-(--job-post-button-bg-from)/20 outline-none transition-all bg-gray-50/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--sidebar-menu-icone-color) ml-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-(--job-post-button-bg-from) focus:ring-2 focus:ring-(--job-post-button-bg-from)/20 outline-none transition-all bg-gray-50/50"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--sidebar-menu-icone-color) ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-(--job-post-button-bg-from) focus:ring-2 focus:ring-(--job-post-button-bg-from)/20 outline-none transition-all bg-gray-50/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-(--sidebar-menu-icone-color) ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-(--job-post-button-bg-from) focus:ring-2 focus:ring-(--job-post-button-bg-from)/20 outline-none transition-all bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-(--sidebar-menu-icone-color) ml-1">How did you hear about Jobito?</label>
                   <input 
                      type="text" 
                      placeholder="e.g. Social Media, Friend, Search Engine"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-(--job-post-button-bg-from) focus:ring-2 focus:ring-(--job-post-button-bg-from)/20 outline-none transition-all bg-gray-50/50"
                    />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-(--sidebar-menu-icone-color) ml-1">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-(--job-post-button-bg-from) focus:ring-2 focus:ring-(--job-post-button-bg-from)/20 outline-none transition-all resize-none bg-gray-50/50"
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-(--job-post-button-bg-from) checked:bg-(--job-post-button-bg-from)"
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <CheckCircle size={12} fill="currentColor" />
                    </div>
                  </div>
                  <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer select-none">
                    I have read and accept the <Link href="/company/terms-service" className="text-(--job-post-button-bg-from) font-semibold hover:underline">Terms of Service</Link> & <Link href="/company/privacy-policy" className="text-(--job-post-button-bg-from) font-semibold hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <div className="pt-4">
                  <button className="px-10 py-4 bg-gradient-to-r from-(--job-post-button-bg-from) to-(--job-post-button-bg-to) text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all transform hover:-translate-y-1 w-full md:w-auto">
                    Submit Message
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>                                                                                                          
      </div>
    </div>
  );
}