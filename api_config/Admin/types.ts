export interface AdminLoginResponse {
  message: string;
  data: {
    token: string;
    email: string;
    role: string;
    id: string;
  }
}

export interface GetEmployersResponse {
  message: string;
  data: EmployersData[];
  currentPage: number;
  total: number;
  totalCount: number;
  limit: number;
}

export interface EmployersData {
  userId: string;
  companyName: string;
  email: string;
  name: string;
  contactNumber: string;
  status: string;
  paymentStatus: string;
}


export interface ApproveRejectEmployerResponse {
  message: string;
  data: { userId: string, status: string, email: string };
}