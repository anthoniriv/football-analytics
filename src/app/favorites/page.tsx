'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/common/GlassCard';
import { useFavoritesStore } from '@/stores/favorites';

export default function FavoritesPage() {
  const { teams, removeTeam, clearAll } = useFavoritesStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="glass rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Mis Favoritos</h1>
      </div>

      {teams.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No tienes favoritos</h2>
            <p className="text-muted-foreground mb-6">
              Busca equipos y agrégalos a tus favoritos para acceder rápidamente.
            </p>
            <Link href="/">
              <Button>Buscar Equipos</Button>
            </Link>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {teams.length} {teams.length === 1 ? 'equipo' : 'equipos'} guardados
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar todos
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GlassCard hover className="flex items-center gap-4">
                  <Link href={`/team/${team.id}`} className="flex items-center gap-4 flex-1">
                    {team.logo && (
                      <div className="relative h-14 w-14 rounded-full overflow-hidden bg-background/50 shrink-0">
                        <Image
                          src={team.logo}
                          alt={team.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{team.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Agregado el {new Date(team.addedAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTeam(team.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
