// src/api/drinkApi.ts
import axios from "../utils/axios";
import { SizeResponse } from "../types/size";
import { ToppingResponse } from "../types/topping";

export const fetchSizes = async (): Promise<SizeResponse[]> => {
  const res = await axios.get("/api/user/sizes");
  return res.data;
};

export const fetchToppings = async (): Promise<ToppingResponse[]> => {
  const res = await axios.get("/api/user/toppings");
  return res.data;
};
