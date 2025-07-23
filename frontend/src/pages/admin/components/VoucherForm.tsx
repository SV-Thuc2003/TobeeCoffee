import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Voucher, VoucherRequest, DiscountType } from '../../../types/voucher';

interface Props {
  voucher: Voucher | null;
  onSubmit: (v: VoucherRequest) => void;
  onCancel: () => void;
}

const VoucherForm: React.FC<Props> = ({ voucher, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  
  const init: VoucherRequest = voucher
    ? {
        code: voucher.code,
        discountType: voucher.discountType,
        discountValue: voucher.discountValue,
        totalQuantity: voucher.totalQuantity,
        expiresAt: voucher.expiresAt.split('T')[0],
        active: voucher.active ?? true,
        translations: voucher.translations,
      }
    : {
        code: '',
        discountType: 'PERCENT',
        discountValue: 0,
        totalQuantity: 1,
        expiresAt: new Date().toISOString().slice(0, 10),
        active: true,
        translations: [{ languageCode: 'vi', name: '', description: '' }],
      };

  const [form, setForm] = useState<VoucherRequest>(init);

  const updateField = (k: keyof VoucherRequest, v: any) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const updateTrans = (i: number, k: keyof Voucher['translations'][0], v: string) => {
    const ts = [...form.translations];
    ts[i] = { ...ts[i], [k]: v };
    setForm(prev => ({ ...prev, translations: ts }));
  };

  const addLocale = () =>
    setForm(prev => ({
      ...prev,
      translations: [...prev.translations, { languageCode: '', name: '', description: '' }],
    }));

  return (
    <form
      onSubmit={e => {
    e.preventDefault();
    const body: VoucherRequest = {
      ...form,
      expiresAt: new Date(form.expiresAt + 'T00:00:00').toISOString(),
    };
    onSubmit(body);
  }}
      className="bg-white p-4 mb-4 rounded shadow"
    >
      <h2 className="text-lg font-semibold mb-2">
        {voucher ? t('voucher.form.edit') : t('voucher.form.new')}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {(['code', 'discountValue', 'totalQuantity', 'expiresAt'] as const).map(k => (
          <div key={k}>
            <label className="block mb-1">{t(`voucher.form.${k}`)}</label>
            <input
              type={k === 'expiresAt' ? 'date' : 'text'}
              className="border p-2 rounded w-full"
              value={(form as any)[k]}
              onChange={e =>
                updateField(
                  k,
                  k === 'discountValue' || k === 'totalQuantity'
                    ? Number(e.target.value)
                    : e.target.value
                )
              }
            />
          </div>
        ))}

        <div>
          <label className="block mb-1">{t('voucher.form.discountType')}</label>
          <select
            className="border p-2 rounded w-full"
            value={form.discountType}
            onChange={e => updateField('discountType', e.target.value as DiscountType)}
          >
            <option value="PERCENT">{t('voucher.form.PERCENT')}</option>
            <option value="FIXED">{t('voucher.form.FIXED')}</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={form.active}
              onChange={e => updateField('active', e.target.checked)}
              className="mr-2"
            />
            {t('voucher.form.active')}
          </label>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium">{t('voucher.form.code')} / translations</h3>
        {form.translations.map((tr, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mt-2">
            <input
              className="border p-2 rounded"
              placeholder="en / vi"
              value={tr.languageCode}
              onChange={e => updateTrans(i, 'languageCode', e.target.value)}
            />
            <input
              className="border p-2 rounded"
              placeholder={t('voucher.form.code')}
              value={tr.name}
              onChange={e => updateTrans(i, 'name', e.target.value)}
            />
            <input
              className="border p-2 rounded"
              placeholder={t('voucher.form.code')}
              value={tr.description}
              onChange={e => updateTrans(i, 'description', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addLocale} className="mt-2 text-blue-600">
          + add translation
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {t('voucher.form.submit')}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
          {t('voucher.form.cancel')}
        </button>
      </div>
    </form>
  );
};

export default VoucherForm;
