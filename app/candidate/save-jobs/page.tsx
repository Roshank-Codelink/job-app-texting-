import SaveJobs from "@/Components/Candidate-Portal/SaveJobs";
import { getSavedJobApi } from "@/api_config/shared/sharedapi";
import { SaveJobsApiResponse } from "@/api_config/shared/type";


export default async function Savejob() {
    const limit = 10
    const GetSavejobs = await getSavedJobApi(1, limit);

    const allsavedjobs = GetSavejobs || []

    console.log("dfckjdsoifjdsiof", allsavedjobs);


    return (
        <div className="w-full">
            <SaveJobs saved={allsavedjobs} />
        </div>
    )
}