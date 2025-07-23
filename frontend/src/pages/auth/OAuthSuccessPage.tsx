import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard"); // Hoặc trang sau khi login thành công
    } else {
      // Nếu không có token, quay lại login
      navigate("/login");
    }
  }, [navigate]);

  return <div>Đang đăng nhập...</div>;
};

export default OAuthSuccessPage;
