import axios from "../utils/axios"; 
import { UserResponse } from "../types/auth";

export interface UserPage {
  content: UserResponse [];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page index, zero-based
}

export const getUsersPage = async (page: number, size: number): Promise<UserPage> => {
  const res = await axios.get(`/api/admin/users?page=${page}&size=${size}`);
  return res.data;
};
export const getUsersByStatusPage = async (status: string, page: number, size: number): Promise<UserPage> => {
  const res = await axios.get(`/api/admin/users/status?status=${status}&page=${page}&size=${size}`);
  return res.data;
};

export const toggleUserStatus = async (id: number): Promise<void> => {
  await axios.put(`/api/admin/users/${id}/toggle-status`);
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`/api/admin/users/${id}`);
}

export const restoreUser = async (id: number): Promise<void> => {
  await axios.put(`/api/admin/users/${id}/restore`);
};
