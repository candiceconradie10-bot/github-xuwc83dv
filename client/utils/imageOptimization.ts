// Image optimization utilities for the APEX application

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  fit?: 'crop' | 'cover' | 'contain' | 'fill';
}

// Generate optimized image URL for different providers
export function getOptimizedImageUrl(
  src: string, 
  options: ImageOptimizationOptions = {}
): string {
  const {
    width = 800,
    height,
    quality = 80,
    format = 'webp',
    fit = 'crop'
  } = options;

  // Handle Pexels images
  if (src.includes('images.pexels.com')) {
    const baseUrl = src.split('?')[0];
    const params = new URLSearchParams();
    
    params.set('auto', 'compress');
    params.set('cs', 'tinysrgb');
    params.set('w', width.toString());
    
    if (height) {
      params.set('h', height.toString());
    }
    
    params.set('fit', fit);
    
    return `${baseUrl}?${params.toString()}`;
  }

  // Handle Unsplash images
  if (src.includes('images.unsplash.com')) {
    const params = new URLSearchParams();
    params.set('w', width.toString());
    
    if (height) {
      params.set('h', height.toString());
    }
    
    params.set('q', quality.toString());
    params.set('fm', format);
    params.set('fit', fit);
    
    return `${src}?${params.toString()}`;
  }

  // For other images, return as-is
  return src;
}

// Generate responsive image sizes
export function getResponsiveImageSizes(): string {
  return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
}

// Generate srcSet for responsive images
export function generateSrcSet(
  src: string, 
  widths: number[] = [400, 800, 1200, 1600]
): string {
  return widths
    .map(width => `${getOptimizedImageUrl(src, { width })} ${width}w`)
    .join(', ');
}

// Create placeholder image data URL
export function createPlaceholderImage(
  width: number = 800, 
  height: number = 600,
  color: string = '#1a1a1a'
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Background
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    
    // APEX logo
    ctx.fillStyle = '#dc143c';
    ctx.font = `${Math.min(width, height) / 8}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('APEX', width / 2, height / 2);
  }
  
  return canvas.toDataURL('image/png');
}

// Lazy loading intersection observer
export function createImageObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Batch preload multiple images
export async function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadImage));
}