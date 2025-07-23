import React from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";
import SocialLoginButton from "../../components/ui/SocialLoginButton";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBEEC1] px-4">
      <div className="w-full max-w-md space-y-4 bg-white p-6 rounded-xl shadow-md">
        <LoginForm />

        <div className="flex items-center gap-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-500 text-sm">{t("login.or")}</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="facebook" />

        <p className="text-center mt-4 text-sm">
          {t("login.no_account")}{" "}
          <a href="/register" className="text-[#4B2E2B] font-semibold hover:underline">
            {t("login.register")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
