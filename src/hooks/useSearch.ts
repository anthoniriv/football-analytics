'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import type { SearchResult } from '@/types/team';

interface UseSearchOptions {
  debounceMs?: number;
  minChars?: number;
}

export function useSearch(options: UseSearchOptions = {}) {
  const { debounceMs = 300, minChars = 2 } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const search = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < minChars) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/football/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Search failed');
        }
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError('Failed to search. Please try again.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [minChars]
  );

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length < minChars) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(() => {
      search(query);
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, debounceMs, minChars, search]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clearSearch,
  };
}
