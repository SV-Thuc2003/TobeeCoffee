// src/services/admin/voucher.service.ts
import axios from "../../utils/axios";
import { Voucher, VoucherRequest } from "../../types/voucher";

const API = "/api/admin/vouchers";

export const getAllVouchers = async (): Promise<Voucher[]> => {
  const res = await axios.get(API);
  return res.data;
};

export const createVoucher = async (voucher: VoucherRequest): Promise<Voucher> => {
  const res = await axios.post(API, voucher);
  return res.data;
};

export const updateVoucher = async (id: number, voucher: VoucherRequest): Promise<Voucher> => {
  const res = await axios.put(`${API}/${id}`, voucher);
  return res.data;
};

export const deleteVoucher = async (id: number): Promise<void> => {
  await axios.delete(`${API}/${id}`);
};
