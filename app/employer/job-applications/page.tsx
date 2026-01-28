import { getJobApplications } from "@/api_config/EmployerInfoApi/jobApplications";
import JobApplicationsTable from "@/Components/Employer-Applications/JobApplicationsTable";

const JobApplicationsPage = async () => {
    const applications = await getJobApplications();

    return (
        <div className="w-full h-full">
            <JobApplicationsTable applications={applications} />
        </div>
    );
};

export default JobApplicationsPage;