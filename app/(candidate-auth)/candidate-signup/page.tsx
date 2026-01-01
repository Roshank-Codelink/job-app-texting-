import MultiStepForm from "@/Components/Candidate-Authentication/Candidate-Signup/Multi-Step-form";
import { candidateSignUpSkillApi } from "@/api_config/shared/sharedapi";
export default async function ProfileOnboarding() {
  
  const skillsData = await candidateSignUpSkillApi();

  return (
    <div>
      <MultiStepForm skillsData={skillsData} />
    </div>
  )
}
