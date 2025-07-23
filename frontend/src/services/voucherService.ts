import axiosInstance from "../utils/axios";

export const spinVoucher = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/voucher/spin",
      {},
      {
        headers: {
          "Accept-Language": navigator.language || "en", // vẫn gắn thêm ngôn ngữ
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
