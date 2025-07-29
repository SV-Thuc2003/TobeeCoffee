import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";

import {
  UserDrink,
  getAvailableDrinks,
  getDrinksByCategory,
} from "../../services/userDrinkService";
import { getAllCategories } from "../../services/category.service";

import { SizeResponse } from "../../types/size";
import { ToppingResponse } from "../../types/topping";
import { CategoryResponse } from "../../types/category";
import { fetchSizes, fetchToppings } from "../../services/SizeTopping";

import ProductCard from "../../components/ui/ProductCard";
import GenericModal from "../../components/ui/Modal";
import DrinkModalContent from "./ProductModal";

const ProductPage: React.FC = () => {
  const [drinks, setDrinks] = useState<UserDrink[]>([]);
  // const [categories, setCategories] = useState([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<UserDrink | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [sizes, setSizes] = useState<SizeResponse[]>([]);
  const [toppings, setToppings] = useState<ToppingResponse[]>([]);


  const { i18n, t } = useTranslation();
  const lang = i18n.language || "vi";

  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryList = await getAllCategories();
        setCategories(categoryList);

        let drinksData: UserDrink[] = [];
        if (categoryId) {
          drinksData = await getDrinksByCategory(Number(categoryId));
        } else {
          drinksData = await getAvailableDrinks();
        }

        const sizeData = await fetchSizes();
        const toppingData = await fetchToppings();

         console.log("✅ Sizes:", sizeData);      // ← Thêm dòng này
      console.log("✅ Toppings:", toppingData); // ← Và dòng này

        setDrinks(drinksData);
        setSizes(sizeData);
        setToppings(toppingData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  // Lấy tên category để hiển thị breadcrumb và tiêu đề
  const categoryName = categoryId
    ? categories.find((c) => c.id === Number(categoryId))?.translations.find((t) => t.languageCode === lang)?.name ||
      categories.find((c) => c.id === Number(categoryId))?.translations[0]?.name ||
      t("nav.products") ||
      "Sản phẩm"
    : t("nav.products") || "Sản phẩm";

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              {t("nav.home") || "Trang chủ"}
            </Link>
          </li>
          <li><span className="mx-2">/</span></li>
          <li>
            <Link to="/products" className="text-blue-600 hover:underline">
              {t("nav.products") || "Sản phẩm"}
            </Link>
          </li>
          {categoryId && (
            <>
              <li><span className="mx-2">/</span></li>
              <li className="text-gray-700">{categoryName}</li>
            </>
          )}
        </ol>
      </nav>

      <h2 className="text-3xl font-bold mb-6">{categoryName}</h2>

      {/* List sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {drinks.map((drink) => {
          const tDrink = drink.translations.find((tr) => tr.languageCode === lang) || drink.translations[0];
          return (
            <div
              key={drink.id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedDrink(drink);
                setShowModal(true);
              }}
            >
              <ProductCard
                id={drink.id}
                image={drink.imageUrl}
                title={tDrink?.name || "Không có tên"}
                price={drink.basePrice}
              />
            </div>
          );
        })}
      </div>

      {/* Modal chi tiết sản phẩm */}
      <GenericModal
        isOpen={showModal}
        title={t("product.detailTitle") || "Chi tiết sản phẩm"}
        onClose={() => setShowModal(false)}
      >
        {selectedDrink && (
          <DrinkModalContent
            drink={selectedDrink}
            sizes={sizes}
            toppings={toppings}
            lang={lang}
            onClose={() => setShowModal(false)}
          />
        )}
      </GenericModal>
    </div>
  );
};

export default ProductPage;
