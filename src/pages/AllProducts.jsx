import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom"; 
import { ProductCard, Container } from "../components/index";
import { showLoader, hideLoader } from "../store/loaderSlice";
import { useDispatch } from "react-redux";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); // ✅ reads ?search=...
  const searchQuery = searchParams.get("search") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(showLoader());

    axios.get("https://dummyjson.com/products?limit=194") 
          .then((res) => setProducts(res.data.products))
          .finally(() => {
            setLoading(false); 
            dispatch(hideLoader());
          });
  }, []);

  // Add this ABOVE your filteredProducts logic

const synonyms = {
  clothes: ["shirts", "tops", "mens-shirts", "womens-shirts", "womens-dresses", "womens-tops", "jackets", "hoodies", "clothing", "apparel", "wear", "dress", "fashion"],
  shoes: ["footwear", "sneakers", "boots", "heels", "sandals", "mens-shoes", "womens-shoes"],
  phone: ["mobile", "smartphone", "iphone", "android", "cellphone", "device"],
  laptop: ["computer", "notebook", "pc", "macbook"],
  watch: ["timepiece", "smartwatch", "wristwatch"],
  beauty: ["makeup", "cosmetics", "skincare", "lipstick", "mascara", "perfume", "fragrance"],
  bag: ["handbag", "purse", "backpack", "tote", "luggage"],
  furniture: ["sofa", "chair", "table", "bed", "desk", "couch"],
  grocery: ["food", "snack", "drink", "beverage", "fruit"],
  jewellery: ["jewelry", "necklace", "ring", "bracelet", "earring", "gold", "silver"],
};

// Expand query with synonyms (code for optimized search matching)
const expandQuery = (query) => {
  const q = query.toLowerCase().trim();
  const extra = [];
  Object.entries(synonyms).forEach(([key, values]) => {
    // if user typed a key word, add its synonyms
    if (q.includes(key) || key.includes(q)) {
      extra.push(...values);
    }
    // if user typed a synonym, add the key and other synonyms
    values.forEach((v) => {
      if (q.includes(v) || v.includes(q)) {
        extra.push(key, ...values);
      }
    });
  });
  return [...new Set([q, ...extra])]; // deduplicated list of all terms to search
};

// Fuzzy char match — returns 0 to 1
const fuzzyScore = (text, query) => {
  let qi = 0;
  for (let ci = 0; ci < text.length && qi < query.length; ci++) {
    if (text[ci] === query[qi]) qi++;
  }
  return qi / query.length;
};

// Levenshtein distance — detects typos like "cloths" → "clothes"
const levenshtein = (a, b) => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
};

  // ✅ Filter products based on search query
const filteredProducts = searchQuery ? products.map((p) => {
        const expandedTerms = expandQuery(searchQuery);
        const title = p.title?.toLowerCase() || "";
        const brand = p.brand?.toLowerCase() || "";
        const category = p.category?.toLowerCase() || "";
        const tags = p.tags?.join(" ").toLowerCase() || "";
        const allText = `${title} ${brand} ${category} ${tags}`;

        let score = 0;

        expandedTerms.forEach((term) => {
          // Exact match
          if (title === term) score += 100;
          if (brand === term) score += 100;
          if (category === term) score += 80;

          // Starts with
          if (title.startsWith(term)) score += 50;
          if (brand.startsWith(term)) score += 50;
          if (category.startsWith(term)) score += 40;

          // Contains full term
          if (title.includes(term)) score += 30;
          if (brand.includes(term)) score += 25;
          if (category.includes(term)) score += 20;
          if (tags.includes(term)) score += 15;

          // Word by word
          term.split(" ").filter(Boolean).forEach((word) => {
            if (word.length < 2) return;
            if (title.includes(word)) score += 10;
            if (brand.includes(word)) score += 8;
            if (category.includes(word)) score += 6;
            if (tags.includes(word)) score += 4;
          });

          // Fuzzy character match
          const fuzz = fuzzyScore(allText, term);
          if (fuzz >= 0.85) score += 12;
          else if (fuzz >= 0.7) score += 7;
          else if (fuzz >= 0.5) score += 3;

          // Levenshtein typo tolerance per word in title
          title.split(" ").forEach((titleWord) => {
            const dist = levenshtein(titleWord, term);
            if (dist === 0) score += 20;
            else if (dist === 1) score += 12; // one typo
            else if (dist === 2) score += 6;  // two typos
          });

          category.split(/[-\s]/).forEach((catWord) => {
            const dist = levenshtein(catWord, term);
            if (dist === 0) score += 15;
            else if (dist === 1) score += 10;
            else if (dist === 2) score += 5;
          });
        });

        return { ...p, score };
      })
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
  : products;

  return (
    <div>
      <Container>
        {/* Show what user searched for */}
        {searchQuery && (
          <div className="mt-6 mb-2 px-2">
            <p className="text-sm text-gray-500">
              Showing results for{" "}
              <span className="font-semibold text-gray-800">"{searchQuery}"</span>
              {" "}— {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          // ✅ No results state
          <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
            <p className="text-gray-500 text-base font-medium">
              No products found for "{searchQuery}"
            </p>
            <p className="text-gray-400 text-sm">Try a different keyword</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 my-4 sm:my-8 px-2 sm:px-0">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProductsPage;