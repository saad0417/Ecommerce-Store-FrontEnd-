import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Button } from './index';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { useNavigate } from "react-router-dom";

function ProductDetails({ product }) {
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
  dispatch(addToCart({ ...product, quantity })); // uses correct 'quantity'
  setQuantity(1); // uses correct 'setQuantity'
  };

  const handleBuyNow = (product) => {
    navigate('/checkout', {
      state: {
        source: 'buyNow',
        items: [{
          id: product.id,
          title: product.title,
          brand: product.brand,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        }]
      }
    });
  };

  return (
    <>
    <div className='bg-white p-4 flex flex-col md:flex-row my-6 md:my-10 gap-6'>

      {/* Image */}
      <div className='w-full md:w-auto md:max-h-[330px] md:max-w-[330px] flex-shrink-0 hover:scale-105 transition duration-500 cursor-pointer'>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-64 md:h-full object-cover rounded"
        />
      </div>

      {/* Details */}
      <div className='px-0 md:px-5 flex flex-col gap-4'>

        {/* Title */}
        <div className='text-lg md:text-[22px]'>{product.title}</div>

        {/* Rating */}
        <div className='flex flex-wrap gap-x-4 items-center'>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} style={{ color: "rgb(229, 185, 0)" }} />
            ))}
          </div>
          <p className='text-[#136cff] text-[14px] hover:underline cursor-pointer'>
            Ratings: {product.rating}
          </p>
        </div>

        {/* Brand */}
        <div className='flex gap-x-2 text-[13px]'>
          <span className='text-[#9e9e9e]'>Brand:</span>
          <span className='text-[#136cff]'>{product.brand}</span>
        </div>

        {/* Price */}
        <div>
          <hr className='border-[#e9e9e9] mb-2' />
          <p className='text-[#f57224] text-xl md:text-[25px]'>$ {product.price}</p>
          <p className='text-[#9e9e9e] text-[15px]'>{product.discountPercentage}% off</p>
          <hr className='border-[#e9e9e9] mt-3' />
        </div>

        {/* Quantity */}
        <div className='flex items-center gap-x-4'>
          <p className='text-sm md:text-base'>Quantity</p>
          <div className='flex items-center gap-x-2'>
            <Button
              className='bg-[#eff0f5] hover:bg-[#d1d1d1] px-3 py-2 text-[20px] active:scale-90 transition duration-200'
              onClick={() => setQuantity(q => q + 1)}
            >+</Button>
            <span className='mx-2 min-w-[24px] text-center'>{quantity}</span>
            <Button
              className='bg-[#eff0f5] hover:bg-[#d1d1d1] px-3 py-2 text-[20px] active:scale-90 transition duration-200'
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            >-</Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-3'>
          <Button 
          className='bg-[#2abbe8] text-[16px] text-white px-[60px] py-[10px] w-full sm:w-auto hover:bg-[#0FB1E3] active:bg-[#0C9CC8] active:scale-90 transition duration-300 rounded-sm'
          onClick={() => handleBuyNow(product)}
          >
            Buy Now
          </Button>
          <Button className='bg-[#f57224] text-[16px] text-white px-[60px] py-[10px] w-full sm:w-auto hover:bg-[#e06a1f] active:bg-[#c85a1a] active:scale-90 transition duration-300 rounded-sm'
            onClick={() => {
              handleAddToCart();
            }}
          >
            Add to Cart
          </Button>
        </div>

      </div>
    </div>

    {/* Description */}
    <div className='bg-white p-4 my-2 md:my-10'>
      <h2 className='text-lg md:text-xl font-bold mb-3'>Product Description</h2>
      <p className='text-[#666]'>{product.description}</p>
    </div>

    {/* Reviews */}
    <div className='bg-white p-4 my-2 md:my-10'>
    <h2 className='text-lg md:text-xl font-bold mb-3'>Customer Reviews</h2>
  
    {product.reviews.map((review, index) => (
    <div key={index} className='border-b  border-[#e9e9e9] pb-3 mb-3'>
      
      <p className='text-black font-semibold'>
        {review.reviewerName}
      </p>

      <p>{review.comment}</p>

      <p className='text-sm'>
        ⭐ Rating: {review.rating}
      </p>

      <p className='text-xs text-gray-400'>
        {review.date}
      </p>

    </div>
    ))}
    </div>


    </>
  );
}

export default ProductDetails;