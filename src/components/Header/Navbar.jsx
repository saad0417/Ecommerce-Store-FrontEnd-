import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../store/loaderSlice";

/* ── Icons ─────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#F65505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CartIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ── Navbar ─────────────────────────────────────────────────────── */
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch(e);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="w-full font-sans sticky top-0 z-40 shadow-md">

        {/* ── TOP BAR — desktop only ───────────────────────────────── */}
        <div className="bg-[#f85606] hidden sm:flex justify-end items-center px-10 py-[5px] gap-5 text-[11.5px]">
          <a href="#" className="text-white/80 hover:text-white transition-colors whitespace-nowrap">SAVE MORE ON APP</a>
          <span className="text-white/30">|</span>
          <a href="#" className="text-white/80 hover:text-white transition-colors whitespace-nowrap">SELL ON SwS</a>
          <span className="text-white/30">|</span>
          <a href="#" className="text-white/80 hover:text-white transition-colors whitespace-nowrap">HELP &amp; SUPPORT</a>
          <span className="text-white/30">|</span>
          <Link to="/login" className="text-white border border-white/60 hover:bg-white hover:text-[#f85606] transition-all text-[11.5px] font-semibold px-3 py-[2px] rounded-sm no-underline">
            LOGIN
          </Link>
          <Link to="/signup" className="bg-white text-[#f85606] hover:bg-orange-50 transition-all text-[11.5px] font-semibold px-3 py-[2px] rounded-sm no-underline">
            SIGN UP
          </Link>
          <span className="text-white/30">|</span>
          <a href="#" className="text-white/80 hover:text-white no-underline font-bold" dir="rtl">زیادہ بچیں</a>
        </div>

        {/* ── MAIN HEADER ──────────────────────────────────────────── */}
        <div className="bg-[#f85606] px-3 sm:px-10 py-2 flex flex-col">

          {/* ── DESKTOP: grid [logo | search | cart] ── */}
          <div className="hidden sm:grid py-2 items-center gap-4 [grid-template-columns:auto_1fr_auto]">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center no-underline">
              <Logo />
            </Link>

            {/* Search */}
            <div className="flex h-[42px] w-full max-w-[750px] justify-self-center rounded-sm overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                className="flex-1 min-w-0 px-4 text-[14px] text-gray-800 bg-white border-none outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-[#FFCAB0] hover:bg-[#FFB089] transition-colors border-none cursor-pointer px-4 flex items-center justify-center flex-shrink-0"
              >
                <SearchIcon />
              </button>
            </div>

            {/* Cart */}
            <Link to="/cart" className="flex-shrink-0 relative no-underline flex items-center" aria-label="Cart">
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#f85606] text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none shadow">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* ── MOBILE: two stacked rows ── */}
          <div className="sm:hidden flex flex-col gap-2 py-2">

            {/* Row 1: hamburger + logo + cart */}
            <div className="flex items-center gap-3">
              <button
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-transparent border-none cursor-pointer rounded-md active:bg-white/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <MenuIcon />
              </button>

              <Link to="/" className="flex-shrink-0 flex items-center no-underline">
                <Logo />
              </Link>

              <Link to="/cart" className="flex-shrink-0 relative no-underline flex items-center ml-auto p-1" aria-label="Cart">
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[#f85606] text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none shadow">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Row 2: search bar */}
            <div className="flex w-full h-[38px] rounded overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                className="flex-1 min-w-0 px-3 text-[14px] text-gray-800 bg-white border-none outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-[#FFCAB0] hover:bg-[#FFB089] transition-colors border-none cursor-pointer px-3 flex items-center justify-center flex-shrink-0"
              >
                <SearchIcon />
              </button>
            </div>

          </div>
        </div>

        {/* ── CATEGORIES BAR — desktop only ────────────────────────── */}
        <div className="hidden sm:flex bg-white border-b border-gray-200 h-[40px] items-center px-10 gap-6">

          {/* Categories Dropdown */}
          <div className="relative h-full flex items-center">
            <button
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className="flex items-center gap-[6px] text-[#0f136d] font-semibold text-[15px] h-full bg-transparent border-none cursor-pointer hover:text-[#f85606] transition-colors whitespace-nowrap"
            >
              Categories <ChevronDownIcon />
            </button>

            {/* Dropdown Panel */}
            {dropdownOpen && (
              <div
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute top-full left-0 w-56 bg-white shadow-xl border border-gray-100 rounded-b-lg z-50 py-1 max-h-[420px] overflow-y-auto"
              >
                {categories.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      navigate(`/category/${cat.slug}`);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[13.5px] text-gray-700 hover:bg-orange-50 hover:text-[#f85606] transition-colors capitalize bg-transparent border-none cursor-pointer"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/products")}
            className="flex items-center text-[#0f136d] font-semibold text-[15px] h-full bg-transparent border-none cursor-pointer hover:text-[#f85606] transition-colors whitespace-nowrap"
          >
            All Products
          </button>
        </div>

      </header>

      {/* ── MOBILE DRAWER ────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 sm:hidden" onClick={closeMobileMenu} />
      )}

      <div className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 sm:hidden transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Fixed header — never scrolls */}
        <div className="bg-[#f85606] flex items-center justify-between px-4 py-3 flex-shrink-0">
          <Link to="/" onClick={closeMobileMenu} className="no-underline">
            <Logo />
          </Link>
          <button onClick={closeMobileMenu} className="w-9 h-9 flex items-center justify-center bg-white rounded-full border-none cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* Auth buttons */}
          <div className="flex gap-3 px-4 py-4 border-b border-gray-100">
            <Link to="/login" onClick={closeMobileMenu}
              className="flex-1 text-center text-sm font-bold text-[#f85606] border-2 border-[#f85606] rounded-lg py-2 no-underline hover:bg-orange-50 transition-colors">
              LOGIN
            </Link>
            <Link to="/signup" onClick={closeMobileMenu}
              className="flex-1 text-center text-sm font-bold text-white bg-[#f85606] rounded-lg py-2 no-underline hover:bg-[#e04d00] transition-colors">
              SIGN UP
            </Link>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col py-2">
            <button onClick={() => { navigate("/products"); closeMobileMenu(); }}
              className="flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#f85606] transition-colors bg-transparent border-none cursor-pointer text-left w-full">
              All Products <ChevronRightIcon />
            </button>

            <button
              onClick={() => setMobileCatsOpen(prev => !prev)}
              className="flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#f85606] transition-colors bg-transparent border-none cursor-pointer text-left w-full"
            >
              Categories
              <ChevronRightIcon />
            </button>

            {mobileCatsOpen && (
              <div className="flex flex-col bg-gray-50 border-t border-gray-100">
                {categories.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      navigate(`/category/${cat.slug}`);
                      closeMobileMenu();
                      setMobileCatsOpen(false);
                    }}
                    className="px-8 py-3 text-[14px] text-gray-600 hover:text-[#f85606] hover:bg-orange-50 transition-colors bg-transparent border-none cursor-pointer text-left capitalize"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </nav>

          <div className="border-t border-gray-100 mx-4" />

          {/* Utility links */}
          <div className="flex flex-col py-2">
            {[{ label: "Save More on App", href: "#" }, { label: "Sell on SwS", href: "#" }, { label: "Help & Support", href: "#" }].map(({ label, href }) => (
              <a key={label} href={href} className="px-5 py-3 text-[14px] text-gray-500 hover:text-[#f85606] hover:bg-orange-50 transition-colors no-underline">
                {label}
              </a>
            ))}
          </div>

        </div>{/* end scrollable */}
      </div>
    </>
  );
};

export default Navbar;