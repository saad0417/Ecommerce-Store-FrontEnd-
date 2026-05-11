// Checkout.jsx
import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Tick } from '../assets/banners/index'
import { Button, Input } from './index'
import { deleteItem } from '../store/cartSlice'

function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [voucher, setVoucher] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const { items = [], source } = location.state || {}

  if (!items.length && !orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <p className="text-gray-500 text-lg">No items to checkout.</p>
        <Button onClick={() => navigate('/')} className="bg-orange-500 text-white px-6 py-2 rounded-lg">
          Continue Shopping
        </Button>
      </div>
    )
  }

  const SHIPPING_FEE = 5
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0),
    [items]
  )
  const total = subtotal + SHIPPING_FEE
  const user = useSelector((state) => state.auth?.userData)

  const handlePlaceOrder = () => {
    // Remove all checked-out items from cart
    items.forEach((item) => dispatch(deleteItem(item.id)))
    // Show popup
    setOrderPlaced(true)
    // Navigate home after 3.5s
    setTimeout(() => {
      setOrderPlaced(false)
      navigate('/')
    }, 2500)
  }

  return (
    <>
      {/* ── ORDER PLACED POPUP ── */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl px-6 py-8 flex flex-col items-center gap-4 w-full max-w-sm animate-fade-in">

            {/* Checkmark */}
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-gray-800">Order Placed!</h2>
            <p className="text-sm text-gray-500 text-center">
              Your order is confirmed and on its way to you.
            </p>

            {/* Road animation */}
            <div className="w-full mt-2">
              {/* Road */}
              <div className="relative w-full h-14 bg-gray-700 rounded-xl overflow-hidden flex items-center">

                {/* Dashed center line */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-4 border-dashed border-yellow-400 opacity-60" />
                </div>

                {/* Moving truck */}
                <div className="absolute animate-truck">
                  <svg width="52" height="32" viewBox="0 0 52 32" fill="none">
                    {/* Body */}
                    <rect x="0" y="6" width="36" height="18" rx="3" fill="#f57224"/>
                    {/* Cab */}
                    <rect x="36" y="10" width="14" height="14" rx="2" fill="#e06010"/>
                    {/* Window */}
                    <rect x="38" y="12" width="8" height="6" rx="1" fill="#BAE6FD"/>
                    {/* Wheels */}
                    <circle cx="10" cy="26" r="4" fill="#1f2937"/>
                    <circle cx="10" cy="26" r="2" fill="#9ca3af"/>
                    <circle cx="28" cy="26" r="4" fill="#1f2937"/>
                    <circle cx="28" cy="26" r="2" fill="#9ca3af"/>
                    <circle cx="44" cy="26" r="4" fill="#1f2937"/>
                    <circle cx="44" cy="26" r="2" fill="#9ca3af"/>
                    {/* Daraz-style logo on truck */}
                    <text x="6" y="19" fontSize="8" fill="white" fontWeight="bold">STOR/E</text>
                  </svg>
                </div>

                {/* Trees / scenery dots */}
                <div className="absolute right-4 bottom-3 w-2 h-6 bg-green-500 rounded-sm opacity-70" />
                <div className="absolute right-8 bottom-3 w-2 h-4 bg-green-600 rounded-sm opacity-70" />
              </div>

              {/* Ground */}
              <div className="w-full h-2 bg-gray-400 rounded-b-xl" />
            </div>

            <p className="text-xs text-gray-400">Redirecting you to home...</p>
          </div>
        </div>
      )}

      {/* ── MAIN CHECKOUT PAGE ── */}
      <div className="min-h-screen bg-[#f5f5f5] py-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-base sm:text-xl font-bold text-gray-800 mb-4 text-center text-white bg-[#f85606]/90 py-2 px-4 rounded-md mx-2">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-start">

            {/* LEFT */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">

              {/* Shipping */}
              <div className="rounded-lg shadow-sm overflow-hidden">
                <div className="bg-[#F9F9F9] px-4 py-2.5 text-sm font-semibold text-gray-700 border-b border-gray-100">
                  Shipping & Billing
                </div>
                <div className="bg-white px-4 py-4">
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mb-2">
                    <p className="font-medium text-sm text-gray-800">{user?.name || 'Customer Name'}</p>
                    <p className="text-sm text-gray-500">{user?.phone || '03xx-xxxxxxx'}</p>
                  </div>
                  <p className="text-sm text-gray-500">📍 {user?.address || 'Customer Address'}</p>
                </div>
              </div>

              {/* Items */}
              <div className="rounded-lg shadow-sm overflow-hidden">
                <div className="bg-[#F9F9F9] px-4 py-2.5 text-sm font-semibold text-gray-700 border-b border-gray-100 flex justify-between items-center">
                  <span>Order Summary</span>
                  <span className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full">
                    {items.length} item{items.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="bg-white px-3 sm:px-4 py-3">
                  <p className="text-xs text-gray-400 mb-3">Package {items.length} of {items.length}</p>

                  <p className="text-xs text-gray-500 mb-2">Delivery Charges:</p>
                  <div className="border border-[#00BFD8] rounded-md px-3 py-3 flex flex-col gap-1 w-fit cursor-pointer mb-5">
                    <div className="flex gap-3 items-center mb-1">
                      <img src={Tick} alt="tick" className="w-4 h-4 object-contain" />
                      <p className="text-sm font-semibold">$ {SHIPPING_FEE.toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-gray-500 ml-7">Standard Delivery</p>
                    <p className="text-xs text-[#00BFD8] ml-7">Guaranteed by Mon, 19 May</p>
                  </div>

                  <div className="flex flex-col divide-y divide-gray-100">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center py-3">
                        <div className="w-14 h-14 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.target.src = item.images?.[0] || ''; e.target.onerror = null }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{item.title}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{item.brand}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <p className="text-sm font-semibold text-[#f57224]">
                            $ {((Number(item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}
                          </p>
                          <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-8">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Order Summary</h2>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 text-xs sm:text-sm">Subtotal ({items.length} item{items.length > 1 ? 's' : ''})</span>
                  <span className="text-gray-800 font-medium text-xs sm:text-sm">$ {(subtotal || 0).toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-500 text-xs sm:text-sm">Shipping Fee</span>
                  <span className="text-gray-800 font-medium text-xs sm:text-sm">$ {SHIPPING_FEE.toFixed(2)}</span>
                </div>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Voucher Code"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    className="flex-1 min-w-0 border border-gray-300 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-orange-400 transition-colors"
                  />
                  <button className="bg-[#0F3460] hover:bg-[#0a2744] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors whitespace-nowrap">
                    APPLY
                  </button>
                </div>

                <hr className="border-gray-200 mb-3" />

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-gray-800">Total</span>
                  <span className="text-base font-bold text-orange-500">$ {(total || 0).toFixed(2)}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm font-bold py-3 rounded-lg transition-all tracking-wide"
                >
                  Place Order
                </button>

                {source && (
                  <p className="text-center text-xs text-gray-400 mt-3">
                    {source === 'buyNow' ? '⚡ Direct purchase' : '🛒 From your cart'}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout