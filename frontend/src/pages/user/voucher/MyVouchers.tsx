// // src/pages/MyVouchers.tsx
// import React, { useEffect, useState } from "react";
// import { getUserVouchers } from "../../../services/voucherService";
// import { UserVoucher } from "../types/userVoucher";
// import VoucherDetailModal from "../components/VoucherDetailModal";

// const MyVouchers = () => {
//   const [vouchers, setVouchers] = useState<UserVoucher[]>([]);
//   const [selected, setSelected] = useState<UserVoucher | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getUserVouchers();
//         setVouchers(res);
//       } catch (error) {
//         console.error("Lỗi lấy voucher:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🎟️ Voucher của bạn</h2>

//       {vouchers.length === 0 ? (
//         <p>Hiện bạn chưa có voucher nào.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {vouchers.map((v, i) => (
//             <div
//               key={i}
//               onClick={() => setSelected(v)}
//               className="border rounded-md p-4 shadow hover:shadow-lg cursor-pointer bg-white"
//             >
//               <h3 className="font-semibold text-lg">{v.voucher.translations[0]?.name}</h3>
//               <p className="text-sm text-gray-600">{v.voucher.translations[0]?.description}</p>
//               <p className="text-sm mt-2">
//                 ⏳ Hết hạn:{" "}
//                 {new Date(v.expireDate).toLocaleDateString()}
//               </p>
//               <p className="text-sm">
//                 Trạng thái: <span className="font-medium">{v.status}</span>
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {selected && (
//         <VoucherDetailModal voucher={selected} onClose={() => setSelected(null)} />
//       )}
//     </div>
//   );
// };

// export default MyVouchers;
