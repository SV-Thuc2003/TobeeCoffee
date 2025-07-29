// components/Checkbox.tsx
import React from "react";

interface CheckboxOption {
  id: number | string;
  label: string;
  value?: any; // thêm nếu cần
}

interface CheckboxProps {
  options: CheckboxOption[];          // Danh sách item để render
  selectedIds: Array<number | string>;  // Các id đang được chọn
  onChange: (selectedIds: Array<number | string>) => void; // callback khi chọn/bỏ chọn
  className?: string;                // Tùy chỉnh class (không bắt buộc)
}

const Checkbox: React.FC<CheckboxProps> = ({ options, selectedIds, onChange, className = "" }) => {
  const toggleId = (id: number | string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map(({ id, label }) => {
        const isChecked = selectedIds.includes(id);
        return (
          <label
            key={id}
            className={`cursor-pointer px-3 py-1 border rounded select-none ${
              isChecked ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleId(id)}
              className="mr-2"
            />
            {label}
          </label>
        );
      })}
    </div>
  );
};

export default Checkbox;
