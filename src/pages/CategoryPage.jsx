import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {ProductCard} from '../components/index';  // ✅ import it
import { showLoader, hideLoader } from "../store/loaderSlice";
import { useDispatch } from "react-redux";

function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(showLoader());

    fetch(`https://dummyjson.com/products/category/${slug}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
        dispatch(hideLoader());
      });
  }, [slug]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-6">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="text-orange-500 hover:underline text-sm">Home</Link>
        <span className="text-gray-400">/</span>
        <h1 className="text-base sm:text-lg font-bold text-gray-800 capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
          <p className="text-gray-500 text-base font-medium">No products found in this category</p>
          <p className="text-gray-400 text-sm">Try browsing other categories</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 my-4 sm:my-8 px-2 sm:px-0">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

    </div>
  );
}

export default CategoryPage;