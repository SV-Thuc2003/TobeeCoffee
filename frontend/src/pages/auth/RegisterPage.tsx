import React from "react";
import RegisterForm from "./RegisterForm";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBEEC1] px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <RegisterForm />
        <p className="text-center mt-4 text-sm">
          {t("register.already_have_account")}{" "}
          <Link to="/login" className="text-[#4B2E2B] font-semibold hover:underline">
            {t("register.login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
