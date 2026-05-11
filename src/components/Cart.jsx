// Cart.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaHeart } from "react-icons/fa";
import { addToCart, removeFromCart, deleteItem, clearCart, decreaseItem, increaseItem } from "../store/cartSlice";
import { Button, Input } from "./index";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const [voucher, setVoucher] = useState("");
  const [checkedIds, setCheckedIds] = useState([]);

  const allChecked = items.length > 0 && checkedIds.length === items.length;

  const toggleAll = () => {
    setCheckedIds(allChecked ? [] : items.map((i) => i.id));
  };

  const toggleOne = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    checkedIds.forEach((id) => dispatch(deleteItem(id)));
    setCheckedIds([]);
  };

  const checkedItems = items.filter((i) => checkedIds.includes(i.id));
  const subtotal = checkedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen py-4 px-3 sm:py-8 sm:px-6 md:px-10">
      <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-start">

        {/* LEFT: Cart Items */}
        <div className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4">

          {/* Select All bar */}
          <div className="w-full px-4 py-3 flex items-center bg-white rounded-xl shadow-sm text-sm font-medium text-gray-600">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="cursor-pointer w-4 h-4 accent-orange-500"
              />
              <span>
                Select All{" "}
                <span className="text-gray-400 font-normal">
                  ({items.length} ITEM{items.length !== 1 ? "S" : ""})
                </span>
              </span>
            </label>
            <Button
              onClick={handleDeleteSelected}
              className="ml-auto flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm"
            >
              <FaTrash size={12} />
              <span>Delete</span>
            </Button>
          </div>

          {/* Empty state */}
          {items.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-400 text-sm">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">

                {/* Brand header */}
                <div className="px-4 py-3 flex items-center gap-2 text-sm font-semibold text-gray-700 border-b border-gray-100">
                  <input
                    type="checkbox"
                    checked={checkedIds.includes(item.id)}
                    onChange={() => toggleOne(item.id)}
                    className="cursor-pointer w-4 h-4 accent-orange-500 flex-shrink-0"
                  />
                  <span className="text-base">🏪</span>
                  <span className="truncate">{item.brand || "Store"}</span>
                </div>

                {/* Product row */}
                <div className="px-4 py-4 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checkedIds.includes(item.id)}
                    onChange={() => toggleOne(item.id)}
                    className="mt-1 cursor-pointer w-4 h-4 accent-orange-500 flex-shrink-0"
                  />

                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = item.images?.[0] || "https://via.placeholder.com/80";
                    }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <p className="text-[13px] font-medium text-gray-800 leading-snug line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-gray-400">{item.brand}</p>

                    <div className="flex items-center justify-between flex-wrap gap-2 mt-1">
                      <div>
                        <p className="text-[15px] font-bold text-orange-500 leading-none">
                          {/* .toLocaleString() Formats number into a readable format (with commas). */}
                          $ {(item.price * item.quantity).toLocaleString()} 
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Qty controls */}
                        <div className="flex items-center gap-1.5">
                          <Button
                            onClick={() => dispatch(decreaseItem(item.id))}
                            className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-bold text-lg leading-none transition active:scale-90"
                          >
                            −
                          </Button>
                          <span className="min-w-[20px] text-center text-sm font-medium text-gray-800">
                            {item.quantity}
                          </span>
                          <Button 
                            onClick={() => dispatch(increaseItem(item.id))}
                            className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-bold text-lg leading-none transition active:scale-90"
                          >
                            +
                          </Button>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-3">
                          <Button 
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <FaHeart size={14} />
                          </Button>
                          <Button
                            onClick={() => {
                              dispatch(deleteItem(item.id));
                              setCheckedIds((prev) => prev.filter((x) => x !== item.id));
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <FaTrash size={13} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-gray-500">
                Subtotal ({checkedItems.length} item{checkedItems.length !== 1 ? "s" : ""})
              </span>
              <span className="text-gray-800 font-medium">
                $ {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-gray-500">Shipping Fee</span>
              <span className="text-gray-800 font-medium">$ 0</span>
            </div>

            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Enter Voucher Code"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                className="w-full flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-orange-400 transition-colors"
              />
              <Button className="bg-[#0F3460] hover:bg-[#0a2744] text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex-shrink-0">
                APPLY
              </Button>
            </div>

            <hr className="border-gray-200 mb-4" />

            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-semibold text-gray-800">Total</span>
              <span className="text-base font-bold text-orange-500">
                $ {subtotal.toLocaleString()}
              </span>
            </div>

            <Button
              onClick={() => {
                if (checkedItems.length === 0) {
                  setShowPopup(true);
                  setTimeout(() => setShowPopup(false), 2500);
                } else {
                  navigate('/checkout', {
                    state: {
                      source: 'cart',
                      items: checkedItems   
                    }
                  });
                }
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm font-bold py-3 rounded-lg transition-all tracking-wide"
            >
              PROCEED TO CHECKOUT ({checkedItems.length})
            </Button>
          </div>
        </div>
      </div>

  {/* Popup Toast */}
  {showPopup && (
  <div className="fixed top-1/2 inset-x-0 -translate-y-1/2 flex justify-center z-50 px-4">
    <div className="flex items-center gap-4 bg-white border border-orange-200 shadow-xl rounded-2xl px-6 py-4 animate-fade-in w-full max-w-md">

      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
        </svg>
      </div>

      {/* Message */}
      <p className="text-sm sm:text-base font-medium text-gray-700 flex-1">
        Please select atleast one item to proceed to checkout.
      </p>

      {/* Close button */}
      <button
        onClick={() => setShowPopup(false)}
        className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

    </div>
  </div>
  )}
    </div>
  );
}

export default Cart;