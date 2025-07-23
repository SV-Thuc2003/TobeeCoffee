import React, { useState } from "react";

const rewards = [
  "Giảm 10%",
  "Giảm 20%",
  "Tặng 1 ly",
  "Miễn phí ship",
  "Giảm 50% đơn tiếp theo",
  "Không trúng – chúc bạn may mắn lần sau 🎉",
];

const SpinVoucher: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Giả lập quay trong 2.5s rồi chọn kết quả ngẫu nhiên
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * rewards.length);
      setResult(rewards[randomIndex]);
      setIsSpinning(false);
    }, 2500);
  };

  return (
    <div className="px-4 py-8 text-center bg-gradient-to-br from-yellow-100 to-pink-100 rounded-xl shadow-inner my-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">🎁 Vòng quay may mắn</h2>
      
      <div className="flex justify-center items-center mb-6">
        <div
          className={`w-40 h-40 rounded-full border-4 border-dashed border-red-400 flex items-center justify-center text-center text-lg font-semibold text-red-700 transition-transform duration-700 ease-in-out ${
            isSpinning ? "animate-spin-slow" : ""
          }`}
        >
          {isSpinning ? "Đang quay..." : "Quay để nhận\nưu đãi"}
        </div>
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 disabled:opacity-50"
      >
        {isSpinning ? "Đang quay..." : "Quay ngay"}
      </button>

      {result && (
        <div className="mt-6 text-green-700 font-semibold text-lg">
          🎉 Bạn nhận được: <span className="font-bold">{result}</span>
        </div>
      )}
    </div>
  );
};

export default SpinVoucher;
