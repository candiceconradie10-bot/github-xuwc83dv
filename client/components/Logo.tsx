import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  showText?: boolean;
}

export function Logo({ 
  className, 
  size = 'md', 
  variant = 'full',
  showText = true 
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn(
        "bg-gradient-to-br from-brand-red to-red-600 rounded-xl flex items-center justify-center shadow-lg",
        sizeClasses[size]
      )}>
        <span className={cn(
          "text-white font-black",
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-xl' : 'text-2xl'
        )}>
          A
        </span>
      </div>
      {variant === 'full' && showText && (
        <span className={cn(
          "text-white font-black",
          textSizeClasses[size]
        )}>
          APEX
        </span>
      )}
    </div>
  );
}