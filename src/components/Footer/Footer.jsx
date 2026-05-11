import React from "react";
import { Link } from "react-router-dom";

/* ── Tiny helper components ───────────────────────────────────────── */

const FooterLink = ({ children }) => (
  <li>
    <Link
      to="#"
      className="text-[13px] text-[#0f136dd] hover:underline transition-colors duration-150"
    >
      {children}
    </Link>
  </li>
);

const FooterText = ({ children }) => (
  <li>
    <span className="text-[11px] text-gray-500">{children}</span>
  </li>
);

const AppBtn = ({ children }) => (
  <Link
    to="#"
    className="flex items-center gap-2 border border-gray-300 hover:border-[#f57224] rounded-md px-3 py-1.5 bg-white transition-colors duration-150 min-w-[128px] no-underline"
  >
    {children}
  </Link>
);

const PayBadge = ({ children, className = "" }) => (
  <div
    className={`flex items-center justify-center rounded px-2 py-1 min-w-[52px] min-h-[28px] border border-gray-200 text-center ${className}`}
  >
    {children}
  </div>
);

const SocialBtn = ({ bgClass, children }) => (
  <Link
    to="#"
    className={`w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity ${bgClass}`}
  >
    {children}
  </Link>
);

/* ── Main Footer ──────────────────────────────────────────────────── */

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 font-sans text-gray-700">

    {/* ── Section 1: Links + App Download ── */}
    <div className="max-w-[1200px] mx-auto px-5 pt-8 pb-6">
      <div className="flex gap-14 flex-wrap">

        {/* Customer Care */}
        <div className="min-w-[148px]">
          <h4 className="text-[15px] font-bold text-gray-800 mb-2.5 mt-0">Customer Care</h4>
          <ul className="list-none p-0 m-0 space-y-[0.5px] text-[10px]">
            {[
              "Help Center", "How to Buy", "Corporate & Bulk Purchasing",
              "Returns & Refunds", "Daraz Shop", "Contact Us",
              "Purchase Protection", "Daraz Pick up Points",
            ].map((item) => <FooterLink key={item}>{item}</FooterLink>)}
          </ul>
        </div>

        {/* Daraz */}
        <div className="min-w-[170px]">
          <h4 className="text-[15px] font-bold text-gray-800 mb-2.5 mt-0">Daraz</h4>
          <ul className="list-none p-0 m-0 space-y-[0.5px] text-[10px]">
            {["About Us", "Digital Payments", "Daraz Donates", "Daraz Blog", "Terms & Conditions", "Privacy Policy"].map(
              (item) => <FooterLink key={item}>{item}</FooterLink>
            )}
            <FooterText>NTN Number : 4012118-6</FooterText>
            <FooterText>STRN Number : 1700401211818</FooterText>
            {["Online Shopping App", "Online Grocery Shopping", "Daraz Exclusive", "Daraz University", "Sell on Daraz", "Join Daraz Affiliate Program"].map(
              (item) => <FooterLink key={item}>{item}</FooterLink>
            )}
          </ul>
        </div>

        {/* App Download — pushed to the right */}
        <div className="flex flex-col gap-3 ml-auto">
          {/* Happy Shopping badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#f57224] flex items-center justify-center text-lg">
              🛍️
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-800 m-0 leading-tight">Happy Shopping</p>
              <p className="text-[11px] text-gray-400 m-0 leading-tight">Download App</p>
            </div>
          </div>

          {/* App Store + Google Play */}
          <div className="flex gap-2 flex-wrap">
            <AppBtn>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#555">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="text-[8px] text-gray-400 m-0 leading-tight">Available on the</p>
                <p className="text-[11px] font-bold text-gray-800 m-0 leading-tight">App Store</p>
              </div>
            </AppBtn>

            <AppBtn>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M3.18 23.76c.37.2.8.2 1.19-.02l11.65-6.57-2.55-2.56z" />
                <path fill="#FBBC05" d="M21.16 10.3l-2.73-1.54-2.87 2.56 2.87 2.87 2.76-1.56a1.57 1.57 0 000-2.33z" />
                <path fill="#4285F4" d="M3.18.24A1.57 1.57 0 001 1.78v20.44c0 .6.33 1.12.82 1.4l.09.05 11.44-11.44v-.27z" />
                <path fill="#34A853" d="M13.47 12.23l2.56-2.56L4.37.1A1.56 1.56 0 003.18.24z" />
              </svg>
              <div>
                <p className="text-[8px] text-gray-400 m-0 leading-tight">ANDROID APP ON</p>
                <p className="text-[11px] font-bold text-gray-800 m-0 leading-tight">Google play</p>
              </div>
            </AppBtn>
          </div>

          {/* AppGallery */}
          <AppBtn>
            <div className="w-[22px] h-[22px] bg-[#cf0a2c] rounded flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-bold">H</span>
            </div>
            <div>
              <p className="text-[8px] text-gray-400 m-0 leading-tight">EXPLORE IT ON</p>
              <p className="text-[11px] font-bold text-gray-800 m-0 leading-tight">AppGallery</p>
            </div>
          </AppBtn>
        </div>

      </div>
    </div>

    <div className="border-t border-gray-200" />

    {/* ── Section 2: Payment + Verified ── */}
    <div className="max-w-[1200px] mx-auto px-5 py-5">
      <div className="flex gap-20 flex-wrap items-start">

        {/* Payment Methods */}
        <div>
          <h4 className="text-[13px] font-bold text-gray-800 mb-3 mt-0">Payment Methods</h4>
          <div className="flex flex-wrap gap-2 max-w-xs">
            <PayBadge className="bg-gray-100 text-gray-600 text-[7px] font-semibold leading-tight">
              CASH ON<br />DELIVERY
            </PayBadge>
            <PayBadge className="bg-[#1a1f71] text-white text-[13px] font-bold">VISA</PayBadge>
            <PayBadge>
              <svg viewBox="0 0 38 24" width="38" height="24">
                <circle cx="15" cy="12" r="7" fill="#EB001B" />
                <circle cx="23" cy="12" r="7" fill="#F79E1B" />
                <path d="M19 6.8a7 7 0 010 10.4A7 7 0 0119 6.8z" fill="#FF5F00" />
              </svg>
            </PayBadge>
            <PayBadge className="bg-[#3bb44a] text-white text-[8px]">easypaisa</PayBadge>
            <PayBadge className="bg-[#c8102e] text-white text-[7px] leading-tight">
              bank<br />alfalah
            </PayBadge>
            <PayBadge className="bg-[#ee0033] text-white text-[7px] leading-tight">
              jazz<br />cash
            </PayBadge>
            <PayBadge className="bg-[#e60012] text-white text-[8px]">UnionPay</PayBadge>
            <PayBadge className="bg-[#006a4e] text-white text-[11px] font-bold">HBL</PayBadge>
            <PayBadge className="bg-[#0071ce] text-white text-[6.5px] leading-tight">
              Easy Monthly<br />Installments
            </PayBadge>
          </div>
        </div>

        {/* Verified By */}
        <div>
          <h4 className="text-[13px] font-bold text-gray-800 mb-3 mt-0">Verified by</h4>
          <div className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2">
            <div className="w-7 h-7 bg-[#003087] rounded flex items-center justify-center">
              <span className="text-white text-[7px] font-bold leading-none">PCI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-gray-400 leading-none">VALIDATED</span>
              <span className="text-[11px] font-bold text-[#003087] leading-none">DSS</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div className="border-t border-gray-200" />

    {/* ── Section 3: International + Social + Copyright ── */}
    <div className="max-w-[1200px] mx-auto px-5 py-5">
      <div className="flex justify-between items-start flex-wrap gap-6">

        {/* Daraz International */}
        <div>
          <h4 className="text-[13px] font-bold text-gray-800 mb-3 mt-0">Daraz International</h4>
          <div className="flex gap-5 flex-wrap">
            {[
              { code: "PK", name: "Pakistan" },
              { code: "BD", name: "Bangladesh" },
              { code: "LK", name: "Sri Lanka" },
              { code: "MM", name: "Myanmar" },
              { code: "NP", name: "Nepal" },
            ].map(({ code, name }) => (
              <Link
                key={name}
                to="#"
                className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-[#f57224] no-underline transition-colors duration-150"
              >
                <img
                  src={`https://flagsapi.com/${code}/flat/64.png`}
                  alt={name}
                  className="w-6 h-6"
                />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-[13px] font-bold text-gray-800 mb-3 mt-0">Follow Us</h4>
          <div className="flex gap-3">
            <SocialBtn bgClass="bg-[#1877f2]">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </SocialBtn>
            <SocialBtn bgClass="bg-black">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialBtn>
            <SocialBtn bgClass="bg-[#e1306c]">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
              </svg>
            </SocialBtn>
            <SocialBtn bgClass="bg-[#ff0000]">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="#fff" d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000" />
              </svg>
            </SocialBtn>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex items-end">
          <span className="text-[12px] text-gray-400">© Daraz 2026</span>
        </div>

      </div>
    </div>

  </footer>
);

export default Footer;