import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../index';
import { showLoader, hideLoader } from "../../store/loaderSlice";
import { useDispatch } from "react-redux";


const CATEGORY_META = {
  'beauty':              { label: 'Beauty',           emoji: '💄' },
  'fragrances':          { label: 'Fragrances',       emoji: '🌸' },
  'furniture':           { label: 'Furniture',        emoji: '🛋️' },
  'groceries':           { label: 'Groceries',        emoji: '🛒' },
  'home-decoration':     { label: 'Home Decor',       emoji: '🏠' },
  'kitchen-accessories': { label: 'Kitchen',          emoji: '🍳' },
  'laptops':             { label: 'Laptops',          emoji: '💻' },
  'mens-shirts':         { label: "Men's Shirts",     emoji: '👔' },
  'mens-shoes':          { label: "Men's Shoes",      emoji: '👟' },
  'mens-watches':        { label: "Men's Watches",    emoji: '⌚' },
  'mobile-accessories':  { label: 'Mobile Acc.',      emoji: '📱' },
  'motorcycle':          { label: 'Motorcycle',       emoji: '🏍️' },
  'skin-care':           { label: 'Skin Care',        emoji: '🧴' },
  'smartphones':         { label: 'Smartphones',      emoji: '📲' },
  'sports-accessories':  { label: 'Sports',           emoji: '⚽' },
  'sunglasses':          { label: 'Sunglasses',       emoji: '🕶️' },
  'tablets':             { label: 'Tablets',          emoji: '📟' },
  'tops':                { label: 'Tops',             emoji: '👕' },
  'vehicle':             { label: 'Vehicle',          emoji: '🚗' },
  'womens-bags':         { label: "Women's Bags",     emoji: '👜' },
  'womens-dresses':      { label: "Women's Dresses",  emoji: '👗' },
  'womens-jewellery':    { label: 'Jewellery',        emoji: '💍' },
  'womens-shoes':        { label: "Women's Shoes",    emoji: '👠' },
  'womens-watches':      { label: "Women's Watches",  emoji: '⌚' },
};

// --- Skeleton Card ---
const SkeletonCard = () => (
  <div className="flex flex-col items-center justify-center gap-2 bg-white p-3 min-h-[100px] sm:min-h-[120px]">
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-200 animate-pulse" />
    <div className="w-14 h-2.5 rounded bg-gray-200 animate-pulse" />
  </div>
);

// --- Single Category Card ---
const CategoryCard = ({ cat, thumbnail, onClick }) => {
  const slug = cat.slug;
  const meta = CATEGORY_META[slug] || {
    label: cat.name || slug.replace(/-/g, ' '),
    emoji: '🛍️',
  };

  return (
    <Button
      onClick={() => onClick(slug)}
      className="flex flex-col items-center justify-center gap-2 bg-white hover:bg-orange-50 active:bg-orange-100 transition-colors duration-150 px-2 py-3 sm:py-4 min-h-[100px] sm:min-h-[120px] cursor-pointer"
    >
      <div className="w-14 h-14 sm:w-30 sm:h-30 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={meta.label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-2xl sm:text-3xl leading-none">{meta.emoji}</span>
        )}
      </div>
      <span className="text-[11px] sm:text-xs text-gray-700 text-center leading-tight max-w-[72px] sm:max-w-[90px] capitalize">
        {meta.label}
      </span>
    </Button>
  );
};

// --- Main Component ---
function HomeCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();

  const fetchThumbnails = async (cats) => {
    const results = await Promise.all(
      cats.map(cat =>
        fetch(`https://dummyjson.com/products/category/${cat.slug}?limit=1&select=thumbnail`)
          .then(res => res.json())
          .then(data => ({ slug: cat.slug, img: data.products?.[0]?.thumbnail || null }))
          .catch(() => ({ slug: cat.slug, img: null }))
      )
    );
    const map = {};
    results.forEach(({ slug, img }) => { map[slug] = img; });
    setThumbnails(map);
  };

  const fetchCategories = () => {
    setLoading(true);
    setError(false);
    dispatch(showLoader());

    fetch('https://dummyjson.com/products/categories')
      .then(res => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(data => {
        setCategories(data);
        setLoading(false);
        fetchThumbnails(data);
        dispatch(hideLoader());
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  const visibleCategories = showAll ? categories : categories.slice(0, 16);

  return (
    <>
      <style>
      {`
      .categories-outer {
        width: 80%;
        background: white;
        padding: 8px 16px;
        margin: 20px auto 40px;
      }
      @media (min-width: 640px) {
        .categories-outer { padding: 10px 24px; }
      }
      @media (min-width: 1024px) {
        .categories-outer { padding: 12px 40px; }
      }

      .categories-inner {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;    /* centers it just like slider-inner */
      }
      `}
      </style>

      <div className="categories-outer">
        <div className="categories-inner">

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-bold text-gray-800">Categories</h2>
            {!error && (
              <Button
                onClick={() => {
                  setShowAll(prev => !prev);
                }}
                className="text-sm text-orange-500 font-medium hover:underline bg-transparent"
              >
                {showAll ? 'Show Less' : 'See All'}
                
              </Button>
            )}
          </div>

          {/* Error State */}
          {error ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3 border border-gray-200 rounded-md">
              <p className="text-gray-500 text-sm">Failed to load categories</p>
              <Button
                onClick={fetchCategories}
                className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-md transition"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-[1px] bg-gray-200 border border-gray-200 rounded-md overflow-hidden border-none">
              {loading
                ? Array.from({ length: 16 }).map((_, i) => <SkeletonCard key={i} />)
                : visibleCategories.map(cat => (
                    <CategoryCard
                      key={cat.slug}
                      cat={cat}
                      thumbnail={thumbnails[cat.slug]}
                      onClick={handleCategoryClick}
                    />
                  ))
              }
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default HomeCategories;