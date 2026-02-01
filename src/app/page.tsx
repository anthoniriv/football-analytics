'use client';

import { useMemo } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { GlassCard } from '@/components/common/GlassCard';
import { useFavoritesStore } from '@/stores/favorites';
import { useSearchStore } from '@/stores/search';
import { Activity, TrendingUp, Zap, BarChart3, Heart, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    icon: TrendingUp,
    title: 'Estadísticas en Vivo',
    description: 'Actualizaciones en tiempo real del rendimiento de equipos y partidos',
  },
  {
    icon: Zap,
    title: 'Métricas de Apuestas',
    description: 'Métricas avanzadas para Over/Under, BTTS, Tarjetas y Córners',
  },
  {
    icon: BarChart3,
    title: 'Análisis xG',
    description: 'Datos de goles esperados para evaluar el rendimiento del equipo',
  },
];

export default function HomePage() {
  const favoriteTeams = useFavoritesStore((state) => state.teams);
  const searchHistory = useSearchStore((state) => state.history);
  const recentSearches = useMemo(() => searchHistory.slice(0, 5), [searchHistory]);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 pt-12"
      >
        <div className="flex items-center justify-center gap-3">
          <Activity className="h-12 w-12 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            Football Analytics
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Plataforma profesional de análisis de fútbol para apuestas.
          Busca cualquier equipo para obtener estadísticas detalladas y predicciones.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SearchBar autoFocus />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <GlassCard hover className="h-full">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {favoriteTeams.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Equipos Favoritos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {favoriteTeams.slice(0, 4).map((team) => (
              <Link key={team.id} href={`/team/${team.id}`}>
                <GlassCard hover className="flex items-center gap-3">
                  {team.logo && (
                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-background/50">
                      <Image
                        src={team.logo}
                        alt={team.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <span className="font-medium truncate">{team.name}</span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {recentSearches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Búsquedas Recientes</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <Link
                key={search.id}
                href={search.resultId ? `/team/${search.resultId}` : '/'}
              >
                <GlassCard hover className="px-4 py-2">
                  <span className="text-sm">{search.resultName || search.query}</span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center py-8"
      >
        <p className="text-sm text-muted-foreground">
          Prueba buscando: Manchester United, Liverpool, Arsenal, Barcelona, Real Madrid
        </p>
      </motion.div>
    </div>
  );
}
