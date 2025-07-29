export interface SizeTranslationResponse {
  languageCode: string;
  name: string;
}

export interface SizeResponse {
  id: number;
  priceModifier: number;
  translations: SizeTranslationResponse[];
}