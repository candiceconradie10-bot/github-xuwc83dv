import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ShoppingBag, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  cta: string;
  link: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
}

export function HeroSlideshow({ 
  slides, 
  autoPlay = true, 
  interval = 5000 
}: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length, interval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* Slideshow Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 transform translate-x-0"
                : index < currentSlide
                  ? "opacity-0 transform -translate-x-full"
                  : "opacity-0 transform translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
              }}
            />
            <div className="absolute inset-0 bg-black/25" />

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_70%)] animate-float" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_60%)] animate-floatReverse" />

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20" />

            {/* Content - Buttons positioned at bottom */}
            <div className="relative h-full flex items-end justify-center">
              <div className="container mx-auto px-4 pb-16 sm:pb-20 relative z-10">
                <div className="text-center max-w-2xl mx-auto">
                  {/* CTA Buttons at bottom */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center px-4 sm:px-0">
                    <a href="#about-section" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full min-h-[56px] bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 font-bold px-6 py-4 sm:px-8 rounded-xl backdrop-blur-lg transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation text-base sm:text-lg active:bg-white/20"
                      >
                        <Play className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="text-sm sm:text-base font-bold">Learn More</span>
                      </Button>
                    </a>
                    <a href="#catalogue-section" className="w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="w-full min-h-[56px] bg-white/20 backdrop-blur-lg border border-white/30 text-white hover:bg-white/30 hover:border-white/50 font-bold px-6 py-4 sm:px-8 rounded-xl shadow-xl mobile-shadow transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation text-base sm:text-lg active:bg-white/40"
                      >
                        <ShoppingBag className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="text-sm sm:text-base font-bold">View All Products</span>
                        <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4 sm:p-6 pointer-events-none">
        {/* Previous Button */}
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="sm"
          className="pointer-events-auto bg-black/30 backdrop-blur-lg border border-white/20 text-white hover:bg-black/50 hover:border-white/40 rounded-full min-w-[48px] min-h-[48px] p-3 sm:p-4 transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation active:bg-black/60"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Next Button */}
        <Button
          onClick={nextSlide}
          variant="ghost"
          size="sm"
          className="pointer-events-auto bg-black/30 backdrop-blur-lg border border-white/20 text-white hover:bg-black/50 hover:border-white/40 rounded-full min-w-[48px] min-h-[48px] p-3 sm:p-4 transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation active:bg-black/60"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`min-w-[44px] min-h-[44px] w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-300 touch-manipulation p-2 ${
                index === currentSlide
                  ? "bg-white shadow-lg scale-125"
                  : "bg-white/40 hover:bg-white/60 active:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="ghost"
          size="sm"
          className="bg-black/30 backdrop-blur-lg border border-white/20 text-white hover:bg-black/50 hover:border-white/40 rounded-full min-w-[44px] min-h-[44px] p-3 transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation active:bg-black/60"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      </div>
    </section>
  );
}