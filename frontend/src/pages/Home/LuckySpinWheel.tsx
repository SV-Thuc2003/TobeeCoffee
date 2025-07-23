import React, { useState } from "react";
import { spinVoucher } from "../../services/voucherService";
import { VoucherResponse } from "../../types/voucher";
import "./LuckySpinWheel.css";

const prizes = [
  "🎁 Voucher",
  "❌ Không trúng",
  "🎁 Voucher",
  "❌ Không trúng",
  "🎁 Voucher",
  "❌ Không trúng",
  "🎁 Voucher",
  "❌ Không trúng",
];

const LuckySpinWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<VoucherResponse | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);

  const handleSpin = async () => {
    if (spinning || hasSpun) return;

    setSpinning(true);
    setResult(null);
    setMessage(null);

    // Vòng quay ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const degreesPerSlice = 360 / prizes.length;
    const stopAngle = 360 * (3 + Math.floor(Math.random() * 2)) + randomIndex * degreesPerSlice;
    setRotation(stopAngle);

    setTimeout(async () => {
      try {
        const res = await spinVoucher();
        if (res.status === 204) {
          setMessage("❌ Bạn chưa may mắn lần này. Hãy thử lại sau!");
        } else {
          setResult(res.data);
          setMessage(null);
        }
      } catch (err: any) {
        const code = err?.response?.data?.message || "";

        if (code === "SPIN_LIMIT_REACHED") {
          setMessage("⛔ Bạn đã quay gần đây. Vui lòng quay lại sau 7 ngày!");
        } else if (err?.response?.status === 401) {
          setMessage("🔓 Bạn chưa đăng nhập. Kết quả không được lưu lại.");
        } else {
          setMessage("⚠️ Đã xảy ra lỗi. Vui lòng thử lại.");
        }
      } finally {
        setSpinning(false);
        setHasSpun(true);
      }
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-6">
      <h2 className="text-2xl font-bold text-center">🎰 Vòng quay may mắn</h2>

      <div className="relative">
        <div
          className={`wheel border-[10px] border-yellow-400 rounded-full w-[300px] h-[300px] transition-transform duration-[4000ms] ease-out`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {prizes.map((text, i) => {
            const angle = (360 / prizes.length) * i;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-left"
                style={{
                  transform: `rotate(${angle}deg) translateX(30%)`,
                }}
              >
                <span className="text-xs text-center block w-20">{text}</span>
              </div>
            );
          })}
        </div>

        {/* Mũi tên chỉ */}
        <div className="absolute top-[calc(50%-10px)] left-[50%] -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-transparent border-b-red-600"></div>
        </div>
      </div>

      <button
        onClick={handleSpin}
        disabled={spinning || hasSpun}
        className={`px-6 py-2 text-white font-semibold rounded-md shadow-md ${
          spinning || hasSpun ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {spinning ? "Đang quay..." : hasSpun ? "Đã quay" : "🎯 Quay ngay"}
      </button>

      {/* Hiển thị kết quả */}
      {result && (
        <div className="bg-green-100 p-4 rounded-md shadow text-center">
          <h3 className="text-lg font-bold text-green-700">🎉 Chúc mừng bạn đã trúng voucher!</h3>
          <p><strong>Mã:</strong> {result.code}</p>
          <p><strong>Tên:</strong> {result.name}</p>
          <p><strong>Mô tả:</strong> {result.description}</p>
          <p>
            <strong>Giá trị:</strong> {result.discountValue} ({result.discountType})
          </p>
        </div>
      )}

      {/* Hiển thị thông báo lỗi */}
      {message && (
        <div className="text-center text-red-600 font-medium">{message}</div>
      )}
    </div>
  );
};

export default LuckySpinWheel;
