import React, { useEffect, useState } from 'react';
import VoucherForm from './components/VoucherForm';
import { Voucher, VoucherRequest } from '../../types/voucher';
import { getAllVouchers, createVoucher, updateVoucher, deleteVoucher } from '../../services/admin/voucher.service';
import { useTranslation } from 'react-i18next';

const AdminVoucherList: React.FC = () => {
  const { t } = useTranslation();
  const [list, setList] = useState<Voucher[]>([]);
  const [edit, setEdit] = useState<Voucher | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => getAllVouchers().then(setList).catch(() => alert(t('voucher.error.fetch')));
  useEffect(() => {
  const fetch = async () => {
    await load();
  };
  fetch();
}, []);


  const handleSubmit = (data: VoucherRequest) => {
    const fn = edit?.id ? updateVoucher(edit.id, data) : createVoucher(data);
    fn
      .then(() => {
        load();
        setShowForm(false);
      })
      .catch(() => alert(t('voucher.error.submit')));
  };

  const handleDelete = (id: number) => {
    if (!confirm(t('voucher.confirm_delete'))) return;
    deleteVoucher(id)
      .then(load)
      .catch(() => alert(t('voucher.error.delete')));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('voucher.title')}</h1>
      <button
        onClick={() => { setShowForm(true); setEdit(null); }}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        {t('voucher.actions.create')}
      </button>
      {showForm && <VoucherForm voucher={edit} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />}

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            {['code', 'discountType', 'discountValue', 'totalQuantity', 'expiresAt', 'active'].map((key) => (
              <th key={key} className="px-4 py-2">{t(`voucher.form.${key}`)}</th>
            ))}
            <th className="px-4 py-2">{t('voucher.actions.delete')}</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr><td colSpan={7} className="text-center py-4">{t('voucher.table.empty')}</td></tr>
          ) : (
            list.map(v => (
              <tr key={v.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{v.code}</td>
                <td className="px-4 py-2">{t(`voucher.form.${v.discountType}`)}</td>
                <td className="px-4 py-2">{v.discountValue}</td>
                <td className="px-4 py-2">{v.totalQuantity}</td>
                <td className="px-4 py-2">{new Date(v.expiresAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">{v.active ? t('voucher.status.ACTIVE') : t('voucher.status.INACTIVE')}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => { setEdit(v); setShowForm(true); }} className="px-2 py-1 bg-blue-500 text-white rounded">
                    {t('voucher.form.edit')}
                  </button>
                  <button onClick={() => handleDelete(v.id!)} className="px-2 py-1 bg-red-500 text-white rounded">
                    {t('voucher.actions.delete')}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVoucherList;
