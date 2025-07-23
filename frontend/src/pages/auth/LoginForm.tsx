import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
// import { loginApi } from "../../services/auth.service";
import { LoginRequest } from "../../types/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";


const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("login.invalid_email"))
      .required(t("login.email_required")),
    password: yup.string().required(t("login.password_required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginRequest) => {
  try {
    const loggedInUser = await login(data);
    alert("Đăng nhập thành công!");

    if (loggedInUser.role === "ADMIN") navigate("/admin");
    else navigate("/");
  } catch (err: any) {
    alert(err.response?.data?.message || "Lỗi đăng nhập");
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold mb-2">{t("login.title")}</h2>

      <InputField
        label={t("login.email")}
        placeholder={t("login.email")}
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <InputField
        label={t("login.password")}
        placeholder={t("login.password")}
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {t("login.submit")}
      </Button>
    </form>
  );
};

export default LoginForm;
