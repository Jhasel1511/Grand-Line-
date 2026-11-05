import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Compass, AlertCircle } from 'lucide-react';
import { useCharacter } from '../hooks/useCharacter';
import { BountyPoster } from '../components/characters/BountyPoster';
import { LoadingState } from '../components/feedback/LoadingState';
import { ErrorState } from '../components/feedback/ErrorState';
import { ConfirmDialog } from '../components/feedback/ConfirmDialog';
import { useFavorites } from '../context/FavoritesContext';
import { Character } from '../types/character';

export const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { character, loading, error, retry } = useCharacter(id);
  const { removeFavorite } = useFavorites();

  const [deleteCandidate, setDeleteCandidate] = useState<Character | null>(null);

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      removeFavorite(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Return to Explore Button */}
      <div className="flex items-center justify-between">
        <Link
          to="/explorar"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#102E46] hover:bg-[#071B2B] text-[#D9A441] hover:text-[#22C7C9] border border-[#D9A441]/40 font-cinzel font-bold text-xs tracking-wider transition-colors shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER A EXPLORAR</span>
        </Link>

        {character && (
          <div className="text-xs font-mono text-[#22C7C9] hidden sm:block">
            ARCHIVOS SECRETOS DE MARINAFORD
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <LoadingState
          message="Desplegando el cartel de SE BUSCA y consultando los archivos navales..."
          count={1}
        />
      )}

      {/* Error state */}
      {error && !loading && (
        <ErrorState
          title="EXPEDIENTE NO LOCALIZADO"
          message={error}
          onRetry={retry}
        />
      )}

      {/* Character detail content */}
      {!loading && !error && character && (
        <BountyPoster
          character={character}
          onRequestDelete={(char) => setDeleteCandidate(char)}
        />
      )}

      {/* Confirmation Dialog with educational dark pattern */}
      <ConfirmDialog
        isOpen={Boolean(deleteCandidate)}
        character={deleteCandidate}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />

    </div>
  );
};
