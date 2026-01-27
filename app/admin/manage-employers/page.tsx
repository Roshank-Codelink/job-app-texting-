import { getEmployers } from "@/api_config/Admin/employers";
import EmployerTable from "@/Components/Admin/employerList/EmployerTable"


const ManageEmployersPage = async () => {


  const employers = await getEmployers();

  return (
    <div className="w-full p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Employers</h1>
      <EmployerTable employerList={employers?.data?.data || []} />
    </div>
  )
}

export default ManageEmployersPage
