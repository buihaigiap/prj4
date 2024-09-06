import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './Home.css';
import HeaderHome from "./New/MenuHome";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
const HomePage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateText, setAnimateText] = useState(false);
  const [isBlurring, setIsBlurring] = useState(false);
  const [roomSearchResults, setRoomSearchResults] = useState([]);
  const images = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
  ];
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
    setAnimateText(true);
    setIsBlurring(true);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    const advanceSlide = () => {
      if (!emblaApi) return;
      const nextIndex = (currentSlide + 1) % images.length;
      emblaApi.scrollTo(nextIndex);
    };
    const id = setInterval(advanceSlide, 3000); // Change slide every 3 seconds
    return () => {
      clearInterval(id);
    };
  }, [emblaApi, currentSlide, images.length]);

  const scrollTo = useCallback((index) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (animateText) {
      const timer = setTimeout(() => setAnimateText(false), 400);
      return () => clearTimeout(timer);
    }
  }, [animateText]);

  useEffect(() => {
    if (isBlurring) {
      const timer = setTimeout(() => setIsBlurring(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isBlurring]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow relative">
        <HeaderHome/>
        <section className="relative h-screen overflow-hidden">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className={`embla__container flex ${isBlurring ? 'blur' : ''}`}>
              {images.map((src, index) => (
                <div className="embla__slide flex-[0_0_100%]" key={index}>
                  <img
                    src={src}
                    alt={`Resort view ${index + 1}`}
                    className="w-full h-[600px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
            <h1
              className={`text-4xl md:text-5xl font-bold text-white text-center mb-8 transition-transform duration-300 ${
                animateText ? 'animate-text' : ''
              }`}
            >
              THE ULTIMATE GETAWAY AT<br/>VAN DER VALK LINSTOW
            </h1>
            <button
              className={`bg-transparent border border-white text-white px-8 py-3 text-lg font-bold tracking-wider hover:bg-white hover:text-[#003366] transition-colors duration-300 ${
                animateText ? 'animate-text' : ''
              }`}
            >
              SPECIAL OFFERS
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </section>

        <section className="absolute bottom-10 left-0 right-0 flex justify-center">
          <RoomSearch handleSearchResult={handleSearchResult}/>
        </section>

      </main>
      <RoomResult roomSearchResults={roomSearchResults}/>
    </div>
  );
};

export default HomePage;
