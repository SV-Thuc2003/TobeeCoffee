import axios from "../utils/axios"; 
import {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  MessageResponse,
} from "../types/auth";

// Gọi API đăng ký
export const registerApi = async (
  data: RegisterRequest
): Promise<MessageResponse> => {
  const response = await axios.post("/api/auth/register", data);
  return response.data;
};

// Gọi API đăng nhập
export const loginApi = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const response = await axios.post("/api/auth/login", data);
  return response.data;
};
