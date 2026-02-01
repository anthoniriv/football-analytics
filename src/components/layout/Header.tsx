'use client';

import Link from 'next/link';
import { Activity, Heart, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';
import { Button } from '@/components/ui/button';
import { useFavoritesStore } from '@/stores/favorites';
import { useState } from 'react';

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const favoriteTeams = useFavoritesStore((state) => state.teams);

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-strong">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Activity className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-gradient hidden sm:inline">
                Football Analytics
              </span>
              <span className="text-xl font-bold text-gradient sm:hidden">
                FA
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Buscar
              </Link>
              <Link
                href="/favorites"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Heart className="h-4 w-4" />
                Favoritos
                {favoriteTeams.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {favoriteTeams.length}
                  </span>
                )}
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden glass rounded-full"
                onClick={() => setMobileNavOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
