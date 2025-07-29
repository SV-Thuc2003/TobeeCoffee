import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../../../components/ui/InputField";
import { DrinkRequest } from "../../../services/admin/drinkService";
import { CategoryResponse } from "../../../types/category";
import { DrinkResponse } from "../../../types/drink";

interface DrinkCreateFormProps {
  onCreate: (drink: DrinkRequest) => void;
  onUpdate?: (drink: DrinkRequest, id: number) => void;
  categories: CategoryResponse[];
  onUploadImage: (file: File) => Promise<string>;
  initialData?: DrinkResponse | null; // dùng cho edit
}

const DrinkCreateForm: React.FC<DrinkCreateFormProps> = ({
  onCreate,
  onUpdate,
  categories,
  onUploadImage,
  initialData = null,
}) => {
  const { t, i18n } = useTranslation();

  const [newDrink, setNewDrink] = useState<DrinkRequest>({
    imageUrl: "",
    basePrice: 0,
    available: true,
    categoryId: categories.length > 0 ? categories[0].id : 0,
    translations: [{ languageCode: "en", name: "", description: "" }],
  });

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Đồng bộ dữ liệu khi chỉnh sửa hoặc đổi categories
  useEffect(() => {
    if (initialData) {
      setNewDrink({
        imageUrl: initialData.imageUrl || "",
        basePrice: initialData.basePrice || 0,
        available: initialData.available,
        categoryId: initialData.category?.id || 0,
        translations: initialData.translations.map(t => ({
          languageCode: t.languageCode,
          name: t.name,
          description: t.description || "",
        })),
      });
      setFile(null);
    } else {
      setNewDrink({
        imageUrl: "",
        basePrice: 0,
        available: true,
        categoryId: categories.length > 0 ? categories[0].id : 0,
        translations: [{ languageCode: i18n.language, name: "", description: "" }],
      });
      setFile(null);
    }
  }, [initialData, categories, i18n.language]);

  // Lấy translation hiện tại theo ngôn ngữ
  const currentLang = i18n.language;
  const currentTranslation =
    newDrink.translations.find((t) => t.languageCode === currentLang) || {
      languageCode: currentLang,
      name: "",
      description: "",
    };

  // Hàm validate
  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};
    if (!currentTranslation.name.trim()) {
      errs.name = t("drink.error.name_required");
    }
    if (newDrink.basePrice <= 0) {
      errs.basePrice = t("drink.error.base_price_invalid");
    }
    if (!newDrink.categoryId) {
      errs.categoryId = t("drink.error.category_required");
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Hàm cập nhật translation name theo ngôn ngữ hiện tại
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedTranslations = [...newDrink.translations];
    const index = updatedTranslations.findIndex(
      (t) => t.languageCode === currentLang
    );
    if (index !== -1) {
      updatedTranslations[index] = {
        ...updatedTranslations[index],
        name: e.target.value,
      };
    } else {
      updatedTranslations.push({
        languageCode: currentLang,
        name: e.target.value,
        description: "",
      });
    }
    setNewDrink({ ...newDrink, translations: updatedTranslations });
  };

  // Hàm cập nhật translation description theo ngôn ngữ hiện tại
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedTranslations = [...newDrink.translations];
    const index = updatedTranslations.findIndex(
      (t) => t.languageCode === currentLang
    );
    if (index !== -1) {
      updatedTranslations[index] = {
        ...updatedTranslations[index],
        description: e.target.value,
      };
    } else {
      updatedTranslations.push({
        languageCode: currentLang,
        name: "",
        description: e.target.value,
      });
    }
    setNewDrink({ ...newDrink, translations: updatedTranslations });
  };

  const handleChangeBasePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDrink({ ...newDrink, basePrice: +e.target.value });
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewDrink({ ...newDrink, categoryId: +e.target.value });
  };

  const handleChangeAvailable = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDrink({ ...newDrink, available: e.target.checked });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      let imageUrl = newDrink.imageUrl;
      if (file) {
        imageUrl = await onUploadImage(file);
      }

      const drinkToSave = { ...newDrink, imageUrl };

      if (initialData && onUpdate) {
        await onUpdate(drinkToSave, initialData.id);
      } else {
        await onCreate(drinkToSave);
      }

      // reset form
      setNewDrink({
        imageUrl: "",
        basePrice: 0,
        available: true,
        categoryId: categories.length > 0 ? categories[0].id : 0,
        translations: [{ languageCode: i18n.language, name: "", description: "" }],
      });
      setFile(null);
      setErrors({});
    } catch (error) {
      alert(t("drink.error.upload_failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryName = (category: CategoryResponse) => {
    const lang = i18n.language;
    const translation = category.translations.find(
      (t) => t.languageCode === lang
    );
    if (translation) return translation.name;
    if (category.translations.length > 0) return category.translations[0].name;
    return "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-[#4B2E2B] text-center">
        {initialData ? t("drink.edit_title") : t("drink.create_title")}
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <InputField
          label={t("drink.name")}
          name="name"
          placeholder={t("drink.name")}
          value={currentTranslation.name}
          onChange={handleChangeName}
          required
          error={errors.name}
          className="w-full"
        />
        <InputField
          label={t("drink.base_price")}
          name="basePrice"
          type="number"
          placeholder={t("drink.base_price")}
          value={newDrink.basePrice}
          onChange={handleChangeBasePrice}
          required
          error={errors.basePrice}
          min={0}
          step={0.01}
          className="w-full"
        />
      </div>

      <InputField
        label={t("drink.description")}
        name="description"
        placeholder={t("drink.description")}
        value={currentTranslation.description || ""}
        onChange={handleChangeDescription}
        className="w-full"
      />

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2">
          <label
            htmlFor="categoryId"
            className="text-lg font-medium text-[#4B2E2B] mb-1 block"
          >
            {t("drink.category")} <span className="text-red-500">*</span>
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={newDrink.categoryId}
            onChange={handleChangeCategory}
            className={`w-full h-[40px] px-3 py-2 text-lg text-[#4B2E2B] border ${
              errors.categoryId ? "border-red-500" : "border-[#d9d9d9]"
            } rounded-md focus:outline-none focus:border-[#4B2E2B] focus:ring-1 focus:ring-[#FFD580] transition-all duration-200`}
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {getCategoryName(cat)}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
          )}
        </div>

        <div className="w-40 h-40 border rounded overflow-hidden relative cursor-pointer">
          <label htmlFor="fileInput" className="w-full h-full block">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : newDrink.imageUrl ? (
              <img
                src={newDrink.imageUrl}
                alt="Current"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                {t("drink.image")}
              </div>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="available"
          type="checkbox"
          checked={newDrink.available}
          onChange={handleChangeAvailable}
          className="w-5 h-5 text-[#4B2E2B] focus:ring-[#FFD580]"
        />
        <label htmlFor="available" className="text-lg text-[#4B2E2B]">
          {t("drink.available")}
        </label>
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[#4B2E2B] text-white py-2 px-12 rounded hover:bg-[#3b261f] transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting
            ? t("drink.saving")
            : initialData
            ? t("drink.update")
            : t("drink.save")}
        </button>
      </div>
    </form>
  );
};

export default DrinkCreateForm;
