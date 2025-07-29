// components/DrinkModalContent.tsx
import React, { useState } from "react";
import { UserDrink } from "../../services/userDrinkService";
import { SizeResponse } from "../../types/size";
import { ToppingResponse } from "../../types/topping";
import { getTranslation } from "../../utils/getTranslation";
import Checkbox from "../../components/ui/Checkbox"; 

type Props = {
  drink: UserDrink;
  sizes: SizeResponse[];
  toppings: ToppingResponse[];
  lang: string;
  onClose: () => void;
};

const DrinkModalContent: React.FC<Props> = ({ drink, sizes, toppings, lang, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<SizeResponse | null>(sizes[0] || null);
  const [selectedToppings, setSelectedToppings] = useState<ToppingResponse[]>([]);

  const tDrink = getTranslation(drink.translations, lang);
  const base = Number(drink.basePrice);
  const sizeExtra = selectedSize ? Number(selectedSize.priceModifier) : 0;
  const toppingExtra = selectedToppings.reduce((sum, t) => sum + Number(t.price), 0);
  const total = base + sizeExtra + toppingExtra;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left: Image */}
      <div className="md:w-1/2 w-full">
        <img
          src={drink.imageUrl}
          alt={tDrink.name}
          className="rounded w-full h-64 object-cover"
        />
      </div>

      {/* Right: Info + Options */}
      <div className="md:w-1/2 w-full">
        <h3 className="text-xl font-bold">{tDrink.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{tDrink.description}</p>

        {/* Size select */}
        <div className="mb-4">
          <label className="font-medium block mb-1">Chọn size</label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => {
              const t = getTranslation(size.translations, lang);
              const isActive = selectedSize?.id === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    isActive ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Topping select using Checkbox component */}
        <div className="mb-4">
          <label className="font-medium block mb-1">Chọn topping</label>
          <Checkbox
  options={toppings.map(topping => ({
    id: topping.id,
    label: `${getTranslation(topping.translations, lang).name} (+${Number(topping.price).toLocaleString()}đ)`
  }))}
  selectedIds={selectedToppings.map(t => t.id)}
  onChange={selectedIds => {
    const newSelected = toppings.filter(t => selectedIds.includes(t.id));
    setSelectedToppings(newSelected);
  }}
/>
        </div>

        {/* Price + Action */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg font-semibold text-primary">
            Tổng: {total.toLocaleString()}đ
          </div>
          <button
            onClick={() => {
              console.log("Add to cart", {
                drinkId: drink.id,
                sizeId: selectedSize?.id,
                toppingIds: selectedToppings.map((t) => t.id),
              });
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={!selectedSize}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrinkModalContent;
