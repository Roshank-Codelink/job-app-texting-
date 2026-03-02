import { getEmployers } from "@/api_config/Admin/employers";
import EmployerTable from "@/Components/Admin/employerList/EmployerTable"


const ManageEmployersPage = async ({ searchParams }: { searchParams: Promise<{ page?: number; limit?: number }> }) => {

  const resolvedSearchParams = await searchParams;
  const employers = await getEmployers({
    page: resolvedSearchParams.page || 1,
    limit: resolvedSearchParams.limit || 10,
  });


  return (
    <div className="w-full p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Employers</h1>
      <EmployerTable employerData={employers?.data} />
    </div>
  )
}

export default ManageEmployersPage
