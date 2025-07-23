
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface MessageResponse {
  message: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  // role: string;
  status: "ACTIVE" | "INACTIVE" | "DELETE";
  createdAt: string;
}

