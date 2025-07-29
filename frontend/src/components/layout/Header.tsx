import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/category.service";
import { CategoryResponse } from "../../types/category";
import { DropdownMenu } from "../../components/ui/DropdownMenu";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="w-full shadow-md px-6 py-4 bg-[#4B2E2B] text-[#FBEEC1] flex items-center justify-between max-h-20">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3">
        <img
          src="/src/assets/logoTobe.png"
          alt="Tobee Coffee Logo"
          className="h-22 w-auto object-contain"
        />
        <span className="text-3xl font-bold whitespace-nowrap">
          Tobee Coffee
        </span>
      </Link>

      {/* Menu chính */}
      <nav className="flex space-x-6 text-lg font-bold flex-1 justify-center">
        <Link
          to="/"
          className="hover:text-[#FFD580] transition-colors duration-200"
        >
          {t("nav.home") || "Trang chủ"}
        </Link>

        {/* Dropdown sản phẩm */}
        <DropdownMenu
          trigger={
            <span className="hover:text-[#FFD580] transition-colors duration-200 cursor-pointer">
              {t("nav.products") || "Thực đơn"}
            </span>
          }
        >
          {categories.map((category) => {
            const translation = category.translations.find(
              (tr) => tr.languageCode === i18n.language
            );
            return (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {translation?.name || "No name"}
              </Link>
            );
          })}
        </DropdownMenu>

        <Link
          to="/promotions"
          className="hover:text-[#FFD580] transition-colors duration-200"
        >
          {t("nav.promotions") || "Ưu đãi"}
        </Link>
        <Link
          to="/store-info"
          className="hover:text-[#FFD580] transition-colors duration-200"
        >
          {t("nav.store") || "Thông tin cửa hàng"}
        </Link>
        <Link
          to="/about"
          className="hover:text-[#FFD580] transition-colors duration-200"
        >
          {t("nav.about") || "Về Tobee"}
        </Link>
      </nav>

      {/* Tìm kiếm + User + Ngôn ngữ */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-[#FBEEC1] rounded px-3 py-1 w-48">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="flex-grow text-[#4B2E2B] placeholder-[#888] outline-none text-sm bg-transparent"
          />
        </div>

        {user ? (
          <DropdownMenu
            trigger={
              <>
                <FaUserCircle size={24} />
                <span>{user.name}</span>
              </>
            }
            align="right"
          >
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
              {t("nav.profile") || "Thông tin cá nhân"}
            </Link>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              {t("nav.logout") || "Đăng xuất"}
            </button>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className="hover:text-[#FFD580] font-medium transition-colors duration-200"
          >
            {t("nav.login") || "Đăng nhập"}
          </Link>
        )}

        <select
          onChange={(e) => changeLang(e.target.value)}
          className="px-2 py-1 border rounded text-sm text-[#4B2E2B]"
          defaultValue={i18n.language}
        >
          <option className="text-base" value="vi">
            🇻🇳 VN
          </option>
          <option className="text-base" value="en">
            🇺🇸 EN
          </option>
        </select>
      </div>
    </header>
  );
};
