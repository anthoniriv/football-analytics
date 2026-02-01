'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/hooks/useSearch';
import { useSearchStore } from '@/stores/search';
import { SearchSuggestions } from './SearchSuggestions';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({ className, autoFocus = false }: SearchBarProps) {
  const router = useRouter();
  const { query, setQuery, results, isLoading, clearSearch } = useSearch();
  const addSearch = useSearchStore((state) => state.addSearch);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelect = (result: { id: number; name: string; type: 'team' | 'player' | 'league' }) => {
    addSearch({
      query,
      type: result.type,
      resultId: result.id,
      resultName: result.name,
    });

    if (result.type === 'team') {
      router.push(`/team/${result.id}`);
    }

    clearSearch();
    setIsFocused(false);
    inputRef.current?.blur();
  };

  // Show suggestions when there are results OR when loading with query >= 2 chars
  const showSuggestions = (isFocused || query.length >= 2) && (results.length > 0 || (isLoading && query.length >= 2) || query.length >= 2);

  return (
    <div ref={containerRef} className={cn('relative w-full max-w-2xl mx-auto', className)}>
      <motion.div
        className={cn(
          'relative glass-strong rounded-2xl transition-all',
          isFocused && 'glow-strong'
        )}
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            inputMode="search"
            enterKeyHint="search"
            placeholder="Buscar equipos, jugadores o ligas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            autoFocus={autoFocus}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="h-14 pl-12 pr-12 bg-transparent border-0 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {isLoading && (
            <Loader2 className="absolute right-12 h-5 w-5 animate-spin text-muted-foreground" />
          )}
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 h-8 w-8"
              onClick={() => {
                clearSearch();
                inputRef.current?.focus();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showSuggestions && (
          <SearchSuggestions
            results={results}
            isLoading={isLoading}
            query={query}
            onSelect={handleSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
