import SaveJobs from "@/Components/Candidate-Portal/SaveJobs";
import { CandidategetSavedJob } from "@/api_config/Candidate/manageJobs"
import { SaveJobsApiResponse } from "@/api_config/shared/type";


export default async function Savejob() {
    const limit = 10
    const GetSavejobs = await CandidategetSavedJob(1, limit);

    const allsavedjobs = GetSavejobs || []

    // console.log("dfckjdsoifjdsiof", allsavedjobs.data[0]?.employer);


    return (
        <div className="w-full">
            <SaveJobs saved={allsavedjobs} />
        </div>
    )
}