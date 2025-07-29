
export interface TranslationResponse {
  languageCode: string;
  name: string;
  description?: string;
}

export interface CategoryResponse {
  id: number;
  translations: TranslationResponse[];
}
