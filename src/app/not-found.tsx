'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/common/GlassCard';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="max-w-md text-center p-8">
          <div className="text-6xl font-bold text-gradient mb-4">404</div>
          <h1 className="text-2xl font-semibold mb-2">Página No Encontrada</h1>
          <p className="text-muted-foreground mb-6">
            La página que buscas no existe o ha sido movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" />
                Ir al Inicio
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2 glass">
                <Search className="h-4 w-4" />
                Buscar Equipos
              </Button>
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
