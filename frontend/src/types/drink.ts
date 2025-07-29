import { CategoryResponse } from "./category"
export interface DrinkTranslationResponse {
  languageCode: string;
  name: string;
  description: string;
}

export interface DrinkResponse {
  id: number;
  imageUrl: string;
  basePrice: number;
  available: boolean;
  createAt: string;
  translations: DrinkTranslationResponse[];
  category: CategoryResponse;
}