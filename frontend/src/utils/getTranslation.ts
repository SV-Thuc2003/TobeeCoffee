// // utils/getTranslation.ts
// export function getTranslation<T extends { languageCode: string }>(
//   translations: T[],
//   lang: string
// ): T {
//   return (
//     translations.find((t) => t.languageCode === lang) ??
//     translations[0] // fallback
//   );
// }

// utils/getTranslation.ts
export const getTranslation = (
  translations: { languageCode: string; name: string; description?: string }[],
  lang: string
) => {
  return (
    translations.find((t) => t.languageCode === lang) ||
    translations[0] || // fallback nếu ko tìm thấy
    { languageCode: lang, name: "No name", description: "" }
  );
};
