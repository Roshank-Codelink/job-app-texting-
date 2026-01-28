import EmployerProfile from "@/Components/Employer-Profile/EmployerProfile";
import { employerInfoApi } from "@/api_config/EmployerInfoApi/employerInfo";
import { GetAllJobsAPI } from "@/api_config/JobPostApi/JobPostApi";




export default async function Profile() {
    const employerInfo = await employerInfoApi();
    console.log("Employer Info:", employerInfo);



    return (
        <div className="w-full h-full ">
            <EmployerProfile employerInfo={employerInfo} />
        </div>
    )
}

