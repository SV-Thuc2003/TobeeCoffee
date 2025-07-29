// import React from "react";
// import ProductCard, { ProductCardProps } from "./ProductCard";

// interface ProductListProps {
//   products: ProductCardProps[];
//   onProductClick?: (product: ProductCardProps) => void;
// }

// const ProductList: React.FC<ProductListProps> = ({
//   products,
//   onProductClick,
// }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-[#FBEEC1] min-h-screen">
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           {...product}
//           onClick={() => onProductClick?.(product)}
//         />
//       ))}
//     </div>
//   );
// };

// export default ProductList;
