import HeroSection from "@/Components/EmploerHub/Section/HeropSection";
import JobitoWorkProcess from "@/Components/EmploerHub/Section/JobitoWorkProcess";
import JobQuality from "../../Components/EmploerHub/Section/JobQuality";
import Candidates from "@/Components/EmploerHub/Section/Candidates";
import Track from "@/Components/EmploerHub/Section/Track";
import System from "@/Components/EmploerHub/Section/System";
import JobitoVerify from "@/Components/EmploerHub/Section/JobitoVerify";
import CostControll from "@/Components/EmploerHub/Section/CostControll";
import Hiring from "@/Components/EmploerHub/Section/Hiring";



export default function EmployerHub() {
  return (
    <>

      <HeroSection />
      <JobitoWorkProcess />
      <JobQuality />
      <Candidates />
      <Track />
      <System />
      <JobitoVerify/>
      <CostControll/>
      <Hiring/>
    
    </>
  );
}