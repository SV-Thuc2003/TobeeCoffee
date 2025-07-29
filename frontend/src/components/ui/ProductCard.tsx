import React from "react";
import { useTranslation } from "react-i18next";
import { FaShoppingCart } from "react-icons/fa";

export interface ProductCardProps {
  id?: number;
  image?: string;
  title: string;
  price: number;
  className?: string;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  className = "",
  onClick,
}) => {
  const { t } = useTranslation();

  const handleCardClick = () => {
  if (onClick) {
    onClick(); // Mở modal khi click
  }
};
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // tránh click trùng với handleCardClick
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`border border-[#e0e0e0] rounded-[20px] overflow-hidden cursor-pointer transition hover:shadow-md ${className}`}
    >
      <div className="w-full h-[360px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
        <p className="text-base text-black mb-4">
          {price.toLocaleString()}₫
        </p>
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <FaShoppingCart />
          {t("add_to_cart")}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
