import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductCard, Button } from '../index';

const BATCH = 50;

function HomeFeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(BATCH);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products?limit=194')
      .then(res => setProducts(res.data.products))
      .finally(() => setLoading(false));
  }, []);

  const visibleProducts = products.slice(0, visible);
  const hasMore = visible < products.length;

  return (
    <div className="w-full bg-none px-4 sm:px-6 lg:px-10 py-4">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-800">Featured Products</h2>
          <span className="text-sm text-gray-400">{visibleProducts.length} of {products.length}</span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-gray-400 text-sm">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {visibleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setVisible(prev => Math.min(prev + BATCH, products.length))}
                  className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold rounded-md transition duration-200"
                >
                  LOAD MORE ({Math.min(BATCH, products.length - visible)} more)
                </Button>
              </div>
            )}

            {/* All loaded */}
            {!hasMore && products.length > 0 && (
              <p className="text-center text-gray-400 text-sm mt-8">
                All {products.length} products loaded
              </p>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default HomeFeaturedProducts;