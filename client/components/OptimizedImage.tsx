import { useState, useEffect } from "react";
import { getOptimizedImageUrl, createPlaceholderImage, createImageObserver } from "@/utils/imageOptimization";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: string;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  width = 800,
  height = 600,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
  placeholder,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState(
    placeholder || createPlaceholderImage(width, height)
  );
  const [hasError, setHasError] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = createImageObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    const imgElement = document.querySelector(`[data-src="${src}"]`);
    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  // Load image when in view
  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      const optimizedSrc = getOptimizedImageUrl(src, { width, quality });

      const img = new Image();
      img.onload = () => {
        setImageSrc(optimizedSrc);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setHasError(true);
        // Keep placeholder on error
      };
      img.src = optimizedSrc;
    }
  }, [isInView, src, width, quality, isLoaded, hasError]);

  return (
    <img
      data-src={src}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-70"
      } ${className}`}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={{
        aspectRatio: `${width}/${height}`,
        objectFit: "cover",
      }}
    />
  );
}