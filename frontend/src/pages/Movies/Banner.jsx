import React, { useState, useEffect, useRef } from "react";
import "../../CSS/Banner.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerImages = [
  {
    image:
      "https://image.tmdb.org/t/p/original//v9acaWVVFdZT5yAU7J2QjwfhXyD.jpg",
    text: "The Wild Robot",
    id: "6739c12831d269c52a1fca2c",
  },
  {
    image:
      "https://image.tmdb.org/t/p/original//3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
    text: "Venom: The Last Dance",
    id: "6739c36d31d269c52a1fca71",
  },
  {
    image:
      "https://image.tmdb.org/t/p/original//18TSJF1WLA4CkymvVUcKDBwUJ9F.jpg",
    text: "Terrifier3",
    id: "6739c56531d269c52a1fca94",
  },
  {
    image:
      "https://image.tmdb.org/t/p/original//2fxnTXr8NwyTFkunkimJkGkhqfy.jpg",
    text: "Apocalypse Z: The Beginning of the End",
    id: "6739c47331d269c52a1fca86",
  },
  {
    image:
      "https://image.tmdb.org/t/p/original//dvBCdCohwWbsP5qAaglOXagDMtk.jpg",
    text: "Deadpool & Wolverine",
    id: "6739c71d31d269c52a1fcab0",
  },
];

const aspectRatios = {
  mobile: "56.25%", // 16:9 aspect ratio for mobile
  tablet: "46.875%", // 15:7 aspect ratio for tablet
  desktop: "41.667%", // 12:5 aspect ratio for desktop
};

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slides, setSlides] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const autoScrollInterval = useRef(null);
  const slideRef = useRef(null);
  const lastInteractionTime = useRef(Date.now());
  const [userinfo, setUserinfo] = useState(false);
  useEffect(() => { 
    if(window.localStorage.getItem("userInfo")){
      setUserinfo(true);
    }
    else
    {
      setUserinfo(false);
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSlides([
      bannerImages[bannerImages.length - 1],
      ...bannerImages,
      bannerImages[0],
    ]);
  }, []);

  const startAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    autoScrollInterval.current = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastInteractionTime.current >= 7000) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      }
    }, 7000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, []);

  const handleSlideChange = (direction) => {
    if (isTransitioning) return;

    lastInteractionTime.current = Date.now();
    setIsTransitioning(true);

    if (direction === "next") {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(bannerImages.length);
    } else if (currentIndex === bannerImages.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else {
      setIsTransitioning(false);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ marginTop: "65px"}}
    >
      {/* Responsive container with dynamic padding-top based on screen size */}
      <div
        className="relative w-full"
        style={{
          paddingTop: isMobile
            ? aspectRatios.mobile
            : window.innerWidth < 1024
            ? aspectRatios.tablet
            : aspectRatios.desktop,
            
        }}
      >
        <div
          ref={slideRef}
          className="absolute inset-0 flex w-full h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning
              ? "transform 500ms ease-in-out"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-full shrink-0">
              {/* Image container with object-fit */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

              {/* Content container */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end p-4 md:p-8 lg:p-12">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white text-center tracking-tight mb-4 max-w-4xl">
                  {slide.text}
                </h1>
                {slide.id && (
                  <a
                    href={userinfo?`/movies/${slide.id}`:"/login"}
                    className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    See More
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons with responsive sizing and positioning */}
        <button
          onClick={() => handleSlideChange("prev")}
          className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 p-1.5 md:p-2 lg:p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors duration-300 z-10"
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
        </button>

        <button
          onClick={() => handleSlideChange("next")}
          className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 p-1.5 md:p-2 lg:p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors duration-300 z-10"
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {bannerImages.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx + 1
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => {
                setCurrentIndex(idx + 1);
                setIsTransitioning(true);
                lastInteractionTime.current = Date.now();
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
