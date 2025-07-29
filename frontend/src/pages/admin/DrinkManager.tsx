import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DrinkCreateForm from "./components/DrinkCreateForm";
import {
  getAllDrinks,
  createDrink,
  uploadImage,
  updateDrink,
  deleteDrink,
  restoreDrink,
  getDrinksByAvailable,
  DrinkRequest,
} from "../../services/admin/drinkService";
import { getAllCategories } from "../../services/category.service";
import { CategoryResponse, TranslationResponse } from "../../types/category";
import { DrinkResponse } from "../../types/drink";

const DrinkManager: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [editingDrink, setEditingDrink] = useState<DrinkResponse | null>(null);
  const [drinks, setDrinks] = useState<DrinkResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "available" | "unavailable">(
    "all"
  );

  // ==================== Helpers ====================
  const getTranslationName = (
    translations: TranslationResponse[],
    langCode: string = i18n.language
  ): string => {
    return (
      translations.find((t) => t.languageCode === langCode)?.name ||
      translations[0]?.name ||
      ""
    );
  };

  const getDrinkName = (
    translations: { languageCode: string; name: string }[]
  ) => getTranslationName(translations as TranslationResponse[]);

  const getDrinkDescription = (
    translations: { languageCode: string; description?: string }[]
  ) => {
    return (
      translations.find((t) => t.languageCode === i18n.language)?.description ||
      translations[0]?.description ||
      "-"
    );
  };

  // ==================== API Calls ====================
  const fetchDrinks = async () => {
    try {
      let data: DrinkResponse[];
      if (filter === "all") {
        data = await getAllDrinks();
      } else {
        data = await getDrinksByAvailable(filter === "available");
      }
      setDrinks(data);
    } catch {
      alert(t("drink.error.fetch_failed"));
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch {
      alert(t("drink.error.fetch_failed"));
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, [filter]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // ==================== Handlers ====================
  const handleCreate = async (drinkToCreate: DrinkRequest) => {
    try {
      const created = await createDrink(drinkToCreate);
      setDrinks((prev) => [...prev, created]);
      setShowForm(false);
    } catch {
      alert(t("drink.error.create_failed"));
    }
  };

  const handleUpdate = async (updatedDrink: DrinkRequest, id: number) => {
    try {
      const result = await updateDrink(id, updatedDrink);
      setDrinks((prev) => prev.map((d) => (d.id === id ? result : d)));
      setEditingDrink(null);
      setShowForm(false);
    } catch {
      alert(t("drink.error.update_failed"));
    }
  };

  const handleDelete = async (id: number) => {
  const confirmed = window.confirm("Bạn có chắc muốn xóa không?");
  console.log("User confirmed:", confirmed);
  if (!confirmed) {
    console.log("User cancelled delete");
    return;
  }
  try {
    await deleteDrink(id);
    setDrinks((prev) => prev.filter((d) => d.id !== id));
  } catch {
    alert(t("drink.error.delete_failed"));
  }
};


  const handleRestore = async (id: number) => {
    try {
      const restored = await restoreDrink(id);
      setDrinks((prev) => prev.map((d) => (d.id === id ? restored : d)));
    } catch {
      alert(t("drink.error.restore_failed"));
    }
  };

  const handleEditClick = (drink: DrinkResponse) => {
    setEditingDrink(drink);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingDrink(null);
    setShowForm(false);
  };

  // ==================== Render ====================
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("drink.manager_title")}</h1>
        <button
          onClick={() => (showForm ? handleCancelForm() : setShowForm(true))}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {showForm ? t("drink.cancel") : t("drink.add_new")}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {t("drink.filter.all")}
        </button>
        <button
          onClick={() => setFilter("available")}
          className={`px-4 py-2 rounded ${
            filter === "available" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          {t("drink.filter.available")}
        </button>
        <button
          onClick={() => setFilter("unavailable")}
          className={`px-4 py-2 rounded ${
            filter === "unavailable" ? "bg-red-600 text-white" : "bg-gray-200"
          }`}
        >
          {t("drink.filter.unavailable")}
        </button>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <DrinkCreateForm
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          initialData={editingDrink}
          categories={categories}
          onUploadImage={uploadImage}
        />
      )}

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">{t("drink.image")}</th>
            <th className="px-4 py-2 border">{t("drink.name")}</th>
            <th className="px-4 py-2 border">{t("drink.base_price")}</th>
            <th className="px-4 py-2 border">{t("drink.category")}</th>
            <th className="px-4 py-2 border">{t("drink.available")}</th>
            <th className="px-4 py-2 border">{t("drink.description")}</th>
            <th className="px-4 py-2 border">{t("drink.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {drinks.map((drink) => (
            <tr key={drink.id} className="text-sm hover:bg-gray-50">
              <td className="px-4 py-2 border">
                <img
                  src={drink.imageUrl}
                  alt={getDrinkName(drink.translations)}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 border">
                {getDrinkName(drink.translations)}
              </td>
              <td className="px-4 py-2 border">{drink.basePrice}</td>
              <td className="px-4 py-2 border">
                {drink.category
                  ? getTranslationName(drink.category.translations)
                  : t("drink.na")}
              </td>
              <td className="px-4 py-2 border">
                <span
                  className={
                    drink.available ? "text-green-600" : "text-red-600"
                  }
                >
                  {drink.available
                    ? t("drink.available")
                    : t("drink.unavailable")}
                </span>
              </td>
              <td className="px-4 py-2 border">
                {getDrinkDescription(drink.translations)}
              </td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEditClick(drink)}
                >
                  {t("drink.edit")}
                </button>
                {drink.available ? (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(drink.id)}
                  >
                    {t("drink.delete")}
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleRestore(drink.id)}
                  >
                    {t("drink.restore")}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrinkManager;
