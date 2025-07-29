// components/DropdownMenu.tsx

import { ReactNode, useState, useRef, useEffect } from "react";

interface DropdownMenuProps {
  trigger: ReactNode; // Nút hoặc link để click vào
  children: ReactNode; // Nội dung dropdown
  align?: "left" | "right"; // Căn lề dropdown
}

export const DropdownMenu = ({ trigger, children, align = "left" }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Đóng menu khi click ngoài component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        {trigger}
      </button>
      {open && (
        <div
          className={`absolute mt-2 w-48 bg-white text-[#4B2E2B] rounded shadow-lg z-50 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
