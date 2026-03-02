import Navbar from "../landing/Navbar/Navbar";

import Footer from "./Footer/Footer";

import JobitoIntro from "./Section/JobitoIntro";
import HeroSection from "./Section/HeroSection";
import JobitoFeed from "./Section/JobitoFeed";
import AIMatch from "./Section/AIMatch";
import JobitoVerify from "./Section/JobitoVerify";
import ApplicationProgress from "./Section/ApplicationProgress";
import ActiveJobs from "./Section/ActiveJobs";

export default function LandingHome() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Navbar />
      <HeroSection />
      <JobitoFeed />
      <AIMatch />
      <JobitoVerify />
      <ActiveJobs />
      <ApplicationProgress />
      <JobitoIntro />
      <Footer />
    </div>
  )
}
