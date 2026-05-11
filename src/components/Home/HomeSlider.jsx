import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';
import {Button} from '../index'

import {
  banner1, banner2, banner3, banner4, banner5, banner6,
  banner7, banner8, banner9, banner10, banner11, banner12
} from "../../assets/banners/index";

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function HomeSlider() {
  const swiperRef = useRef(null);

  const sliderImages = [
    banner8, banner2, banner3, banner4, banner1, banner6,
    banner5, banner7, banner9, banner10, banner11, banner12
  ];

  return (
    <>
      <style>{`
        .slider-outer {
          width: 100%;
          background: #f5f5f5;
          padding: 8px 16px;        /* mobile: small padding */
          margin-bottom: 3rem;
        }

        @media (min-width: 640px) {
          .slider-outer {
            padding: 10px 24px;
          }
        }

        @media (min-width: 1024px) {
          .slider-outer {
            padding: 12px 40px;     /* desktop: daraz jesa padding */
          }
        }

        .slider-inner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }

        .slider-inner .swiper {
          width: 100% !important;
          border-radius: 8px;
          overflow: hidden;
        }

        .slider-inner .swiper-slide {
          width: 100% !important;
          flex-shrink: 0;
        }

        .slider-inner .swiper-pagination {
          bottom: 8px;
        }

        .slider-inner .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: white;
          opacity: 0.6;
          transition: all 0.3s;
        }

        .slider-inner .swiper-pagination-bullet-active {
          opacity: 1;
          width: 18px;
          border-radius: 4px;
          background: white;
        }

        .slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0,0,0,0.45);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .slider-inner:hover .slider-nav-btn {
          opacity: 1;
        }

        .slider-nav-btn:hover {
          background: rgba(0,0,0,0.7);
        }

        .slider-nav-btn.prev { left: 10px; }
        .slider-nav-btn.next { right: 10px; }

        @media (max-width: 640px) {
          .slider-nav-btn { display: none !important; }
        }
      `}
      </style>


      {/* outer: full screen width with padding */}
      <div className="slider-outer">
        {/* inner: max-width centered container */}
        <div className="slider-inner">
        <Link to="/products">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            observer={true}
            observeParents={true}
            resizeObserver={true}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
          >
            {sliderImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Banner ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'clamp(140px, 28vw, 420px)',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Link>

          <Button className="slider-nav-btn prev" onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous">
            <ChevronLeft />
          </Button>
          <Button className="slider-nav-btn next" onClick={() => swiperRef.current?.slideNext()} aria-label="Next">
            <ChevronRight />
          </Button>
        </div>

      </div>
    </>
  );
}

export default HomeSlider;