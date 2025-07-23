import React from "react";
import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface Props {
  provider: "google" | "facebook";
}

const SocialLoginButton: React.FC<Props> = ({ provider }) => {
  const { t } = useTranslation();

  const redirectToProvider = () => {
    window.location.href = `/oauth2/authorization/${provider}`;
  };

  const renderIcon = () => {
    if (provider === "google") return <FcGoogle className="text-2xl mr-2" />;
    if (provider === "facebook") return <FaFacebook className="text-blue-600 text-2xl mr-2" />;
    return null;
  };

  const providerLabel = provider === "google" ? "Google" : "Facebook";

  return (
    <button
      onClick={redirectToProvider}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 cursor-pointer"
    >
      {renderIcon()}
      <span className="text-md font-medium">
        {t("login.continue_with", { provider: providerLabel })}
      </span>
    </button>
  );
};

export default SocialLoginButton;
