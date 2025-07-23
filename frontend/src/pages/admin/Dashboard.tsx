import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaTicketAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { useTranslation } from "react-i18next";

const AdminDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4B2E2B] text-[#FBEEC1] p-6">
        <h2 className="text-2xl font-bold mb-6">{t("admin.admin")}</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 hover:text-yellow-400"
          >
            <MdOutlineDashboard /> {t("admin.dashboard")}
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 hover:text-yellow-400"
          >
            <FaUsers /> {t("admin.users")}
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-2 hover:text-yellow-400"
          >
            <FaBoxOpen /> {t("admin.products")}
          </Link>
          <Link
            to="/admin/vouchers"
            className="flex items-center gap-2 hover:text-yellow-400"
          >
             <FaTicketAlt/> {t("admin.vouchers")}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header / Topbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t("admin.dashboard")}</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{t("admin.admin")}</span>
            <select
              onChange={(e) => handleChangeLanguage(e.target.value)}
              value={i18n.language}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="vi">🇻🇳 Tiếng Việt</option>
              <option value="en">🇺🇸 English</option>
            </select>
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Nội dung */}
        <main className="p-6 bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

