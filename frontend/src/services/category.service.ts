
import axios from "../utils/axios";
import { CategoryResponse } from "../types/category";

export const getAllCategories = async (): Promise<CategoryResponse[]> => {
  const response = await axios.get<CategoryResponse[]>("/api/categories");
  return response.data;
};
