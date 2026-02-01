'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Search, Heart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavoritesStore } from '@/stores/favorites';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const favoriteTeams = useFavoritesStore((state) => state.teams);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-3/4 max-w-sm glass-strong border-l"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" />
                  <span className="font-bold text-gradient">Menú</span>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 p-4 space-y-2">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-lg glass hover:glow transition-all"
                >
                  <Search className="h-5 w-5 text-primary" />
                  <span>Buscar</span>
                </Link>

                <Link
                  href="/favorites"
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-lg glass hover:glow transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-primary" />
                    <span>Favoritos</span>
                  </div>
                  {favoriteTeams.length > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      {favoriteTeams.length}
                    </span>
                  )}
                </Link>
              </nav>

              <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Football Analytics v1.0
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
