// src/services/drinkService.ts
import axios from "../../utils/axios";

export interface Translation {
  languageCode: string;
  name: string;
  description: string;
}

export interface DrinkRequest {
  imageUrl: string;
  basePrice: number;
  available: boolean;
  categoryId: number;
  translations: Translation[];
}

export const getAllDrinks = async () => {
  const res = await axios.get("/api/admin/drinks");
  return res.data;
};

export const restoreDrink = async (id: number) => {
  const res = await axios.put(`/api/admin/drinks/${id}/restore`);
  return res.data;
};

export const getDrinksByAvailable = async (available: boolean) => {
  const res = await axios.get(`/api/admin/drinks/filter`, {
    params: { available }
  });
  return res.data;
};

export const createDrink = async (drink: DrinkRequest) => {
  const res = await axios.post("/api/admin/drinks", drink);
  return res.data;
};

export const updateDrink = async (id: number, drink: DrinkRequest) => {
  const res = await axios.put(`/api/admin/drinks/${id}`, drink);
  return res.data;
};

export const deleteDrink = async (id: number) => {
  await axios.delete(`/api/admin/drinks/${id}`);
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("/api/admin/drinks/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
