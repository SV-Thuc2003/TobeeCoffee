// src/components/ui/Breadcrumb.tsx
import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="text-sm text-gray-600 mb-4">
      {items.map((item, index) => (
        <span key={index} className="inline-flex items-center">
          {item.to ? (
            <Link
              to={item.to}
              className="hover:underline text-blue-600 cursor-pointer"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[#4B2E2B]">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-1">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
