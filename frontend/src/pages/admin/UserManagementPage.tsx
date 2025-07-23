// // src/pages/admin/UserManagementPage.tsx
// import React, { useEffect, useState } from "react";
// import { getAllUsers, toggleUserStatus } from "../../services/admin.service";
// import { UserResponse } from "../../types/user";
// import { Button } from "../../components/ui/Button";

// const UserManagementPage: React.FC = () => {
//   const [users, setUsers] = useState<UserResponse[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchUsers = async () => {
//     try {
//       const data = await getAllUsers();
//       setUsers(data);
//     } catch (error) {
//       alert("Lỗi khi tải danh sách người dùng");
//     }
//   };

//   const handleToggleStatus = async (id: number) => {
//     try {
//       await toggleUserStatus(id);
//       fetchUsers();
//     } catch (error) {
//       alert("Lỗi khi cập nhật trạng thái người dùng");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>

//       <input
//         type="text"
//         placeholder="Tìm kiếm theo tên hoặc email..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="border border-gray-300 rounded px-3 py-2 mb-4 w-full max-w-md"
//       />

//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Họ tên</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Vai trò</th>
//             <th className="border p-2">Trạng thái</th>
//             <th className="border p-2">Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user) => (
//             <tr key={user.id}>
//               <td className="border p-2 text-center">{user.id}</td>
//               <td className="border p-2">{user.name}</td>
//               <td className="border p-2">{user.email}</td>
//               <td className="border p-2 text-center">{user.role}</td>
//               <td className="border p-2 text-center">
//                 <span
//                   className={`px-2 py-1 text-sm rounded ${
//                     user.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {user.status}
//                 </span>
//               </td>
//               <td className="border p-2 text-center">
//                 <button
//                   onClick={() => handleToggleStatus(user.id)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   {user.status === "ACTIVE" ? "Vô hiệu hóa" : "Kích hoạt"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagementPage;
