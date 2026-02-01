'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Trophy, User } from 'lucide-react';
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton';
import type { SearchResult } from '@/types/team';

interface SearchSuggestionsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
  onSelect: (result: SearchResult) => void;
}

const typeIcons = {
  team: Users,
  player: User,
  league: Trophy,
};

export function SearchSuggestions({
  results,
  isLoading,
  query,
  onSelect,
}: SearchSuggestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl overflow-hidden z-50"
    >
      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="p-3">
            <LoadingSkeleton variant="search" count={3} />
          </div>
        ) : results.length > 0 ? (
          <ul className="py-2">
            {results.map((result) => {
              const Icon = typeIcons[result.type];
              return (
                <li key={`${result.type}-${result.id}`}>
                  <button
                    onClick={() => onSelect(result)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors text-left"
                  >
                    {result.logo ? (
                      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-background/50">
                        <Image
                          src={result.logo}
                          alt={result.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="capitalize">
                          {result.type === 'team' ? 'Equipo' : result.type === 'player' ? 'Jugador' : 'Liga'}
                        </span>
                        {result.country && (
                          <>
                            <span>·</span>
                            <span>{result.country}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : query.length >= 2 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>No se encontraron resultados para "{query}"</p>
            <p className="text-sm mt-1">Intenta con otro término de búsqueda</p>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
