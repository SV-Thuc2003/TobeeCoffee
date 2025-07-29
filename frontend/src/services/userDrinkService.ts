import axios from "../utils/axios";

export interface DrinkTranslation {
  languageCode: string;
  name: string;
  description?: string;
}

export interface UserDrink {
  id: number;
  imageUrl: string;
  basePrice: number;
  available: boolean;
  translations: DrinkTranslation[];
}

// Lấy toàn bộ sản phẩm đang hiển thị
export const getAvailableDrinks = async (): Promise<UserDrink[]> => {
  const res = await axios.get("/api/user/drinks");
  return res.data;
};

// Lấy sản phẩm theo danh mục
export const getDrinksByCategory = async (categoryId: number): Promise<UserDrink[]> => {
  const res = await axios.get(`/api/user/drinks/category/${categoryId}`);
  return res.data;
};

// Lấy chi tiết 1 sản phẩm
export const getDrinkById = async (id: number): Promise<UserDrink> => {
  const res = await axios.get(`/api/user/drinks/${id}`);
  return res.data;
};

// Hàm phụ trợ lấy bản dịch theo ngôn ngữ
export const getTranslation = (
  drink: UserDrink,
  lang: string
): DrinkTranslation | undefined => {
  return drink.translations.find(t => t.languageCode === lang);
};
