
import ProfileOnboarding from "@/Components/Candidate-Authentication/Candidate-Onboarding/ProfileOnboarding";
import { candidateOnboardingSkill } from "@/api_config/shared/sharedapi";
export default async function Onboarding() {
  
  const skillsData = await candidateOnboardingSkill();

  return (
    <div>
      <ProfileOnboarding skillsData={skillsData} />
    </div>
  )
}
