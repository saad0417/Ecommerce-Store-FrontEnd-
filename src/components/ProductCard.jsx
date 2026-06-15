import React from 'react'
import { Button } from "./index"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent Link navigation when clicking the button
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        brand: product.brand,
        quantity: 1, 
      })
    );
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-xl p-2 sm:p-3 cursor-pointer hover:shadow-md transition duration-300 flex flex-col">
    <Link to={`/products/${product.id}`} className="block">

        {/* Product Image */}
        <div className="w-full aspect-square overflow-hidden rounded-lg mb-2">
          <img
            src={product.thumbnail}
            alt={product.title}
            onError={(e) => {
              e.target.src = product.images?.[0] || "https://via.placeholder.com/150";
            }}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Price + Discount */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <p className="text-[#F55405] font-bold text-sm sm:text-base">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-400 text-[11px] sm:text-xs">
            -{Math.round(product.discountPercentage)}%
          </p>
        </div>
        </Link>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-[#FF7D3C] text-white py-1.5 px-2 rounded-lg hover:bg-[#FF691E] transition duration-300 text-xs sm:text-sm active:scale-95 active:bg-[#F55405]"
        >
          Add to Cart
        </Button>

      </div>
  );
}

export default ProductCard;