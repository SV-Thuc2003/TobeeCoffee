import React, { useEffect, useState } from "react";
import {
  getUsersPage,
  getUsersByStatusPage,
  toggleUserStatus,
  deleteUser,
  restoreUser,
  UserPage,
} from "../../services/admin.service";
import { UserResponse } from "../../types/auth";
import { useTranslation } from "react-i18next";

const UserListPage: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [pageInfo, setPageInfo] = useState<UserPage>({
    content: [],
    totalPages: 0,
    totalElements: 0,
    size: 10,
    number: 0,
  });
  const [filterStatus, setFilterStatus] = useState<"ALL" | "ACTIVE" | "DELETE">("ALL");

  const fetchUsers = async (page = 0, size = 10) => {
    try {
      let data: UserPage;
      if (filterStatus === "ALL") {
        data = await getUsersPage(page, size);
      } else {
        data = await getUsersByStatusPage(filterStatus, page, size);
      }
      setPageInfo(data);
      setUsers(data.content);
    } catch (error) {
      alert(t("user.error_fetch"));
    }
  };

  useEffect(() => {
    fetchUsers(0, pageInfo.size);
  }, [filterStatus]);

  const handleToggleStatus = async (id: number) => {
    try {
      await toggleUserStatus(id);
      fetchUsers(pageInfo.number, pageInfo.size);
    } catch {
      alert(t("user.error_toggle"));
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm(t("user.confirm_delete"))) return;

    try {
      await deleteUser(id);
      fetchUsers(pageInfo.number, pageInfo.size);
    } catch {
      alert(t("user.error_delete"));
    }
  };

  const handleRestoreUser = async (id: number) => {
    try {
      await restoreUser(id);
      fetchUsers(pageInfo.number, pageInfo.size);
    } catch {
      alert(t("user.error_restore"));
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchUsers(newPage, pageInfo.size);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t("user.title")}</h1>

      {/* Filter tab */}
      <div className="mb-4 space-x-2">
        {(["ALL", "ACTIVE", "DELETE"] as const).map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded ${
              filterStatus === status
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setFilterStatus(status)}
          >
            {status === "ALL"
              ? t("user.filter.all")
              : status === "ACTIVE"
              ? t("user.filter.active")
              : t("user.filter.deleted")}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">{t("user.table.name")}</th>
              <th className="px-4 py-2">{t("user.table.email")}</th>
              <th className="px-4 py-2">{t("user.table.role")}</th>
              <th className="px-4 py-2">{t("user.table.status")}</th>
              <th className="px-4 py-2">{t("user.table.created")}</th>
              <th className="px-4 py-2">{t("user.table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  {t("user.table.no_data")}
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : user.status === "INACTIVE"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t(`user.status.${user.status}`)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {user.status !== "DELETE" ? (
                      <>
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === "ACTIVE"
                            ? t("user.actions.disable")
                            : t("user.actions.enable")}
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          {t("user.actions.delete")}
                        </button>
                      </>
                    ) : (
                      <button
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                        onClick={() => handleRestoreUser(user.id)}
                      >
                        {t("user.actions.restore")}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: pageInfo.totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded ${
              idx === pageInfo.number
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
