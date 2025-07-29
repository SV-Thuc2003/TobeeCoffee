export interface ToppingTranslationResponse {
  languageCode: string;
  name: string;
}

export interface ToppingResponse {
  id: number;
  price: number;
  translations: ToppingTranslationResponse[];
}