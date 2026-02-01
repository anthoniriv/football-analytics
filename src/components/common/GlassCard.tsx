'use client';

import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  variant?: 'default' | 'strong' | 'subtle';
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = 'default',
  hover = false,
  glow = false,
  ...props
}: GlassCardProps) {
  const variants = {
    default: 'glass',
    strong: 'glass-strong',
    subtle: 'glass-subtle',
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl p-4',
        variants[variant],
        hover && 'hover-lift cursor-pointer',
        glow && 'glow',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
