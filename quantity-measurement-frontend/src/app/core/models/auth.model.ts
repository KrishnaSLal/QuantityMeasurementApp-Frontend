export interface SignupRequest {
  name?: string;
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
