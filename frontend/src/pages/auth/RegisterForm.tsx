import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { registerApi } from "../../services/auth.service";
import { RegisterRequest } from "../../types/auth";
import { useTranslation } from "react-i18next";

const RegisterForm: React.FC = () => {
  const navigate  = useNavigate();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    name: yup.string().required(t("register.name_required")),
    email: yup
      .string()
      .email(t("register.email_invalid"))
      .required(t("register.email_required")),
    password: yup
      .string()
      .min(6, t("register.password_min"))
      .required(t("register.password_required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("register.confirm_mismatch"))
      .required(t("register.confirm_required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    console.log("Submitting form with data:", data);
    try {
      const response = await registerApi(data);
      alert(response.message);
      navigate("/login")
    } catch (err: any) {
      alert(err.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-2">{t("register.title")}</h2>
      <InputField
        label={t("register.name")}
        placeholder={t("register.placeholder_name")}
        {...register("name")}
        error={errors.name?.message}
      />
      <InputField
        label={t("register.email")}
        placeholder={t("register.placeholder_email")}
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <InputField
        label={t("register.password")}
        placeholder={t("register.placeholder_password")}
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      <InputField
        label={t("register.confirm_password")}
        placeholder={t("register.placeholder_confirm_password")}
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {t("register.title")}
      </Button>
    </form>
  );
};

export default RegisterForm;
