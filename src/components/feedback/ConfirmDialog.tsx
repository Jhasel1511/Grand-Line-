import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X, Trash2, ShieldAlert } from 'lucide-react';
import { Character } from '../../types/character';
import { getCharacterPortrait, getNauticalAvatarSvg } from '../../utils/characterAvatars';

interface ConfirmDialogProps {
  isOpen: boolean;
  character: Character | null;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * =========================================================================
 * NOTA EDUCATIVA SOBRE PATRÓN OSCURO (DARK PATTERN - CONFIRMSHAMING):
 * 
 * Este modal implementa intencionadamente una técnica de "Confirmshaming"
 * y apelación emocional con propósito estrictamente pedagógico.
 * Se busca ilustrar a los estudiantes y evaluadores cómo ciertas interfaces
 * diseñan mensajes de culpabilización o dramatismo para disuadir al usuario
 * de completar una acción legítima (como desuscribirse, cancelar o eliminar un elemento).
 * A pesar del mensaje persuasivo, se preserva la usabilidad ética permitiendo
 * al usuario cancelar o confirmar la eliminación con total claridad y botones visibles.
 * =========================================================================
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  character,
  onConfirm,
  onCancel
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  if (!character) return null;

  const portrait = getCharacterPortrait(character.name, character.id) || getNauticalAvatarSvg(character.name, character.bounty);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      className="p-0 rounded-2xl bg-transparent backdrop:bg-black/80 backdrop:backdrop-blur-sm max-w-md w-full m-auto shadow-2xl open:animate-slide-in border-0"
    >
      <div className="bg-[#071B2B] text-[#F7FAFC] border-2 border-[#D9A441] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        
        {/* Top Decorative Rope / Banner */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D9A441] via-[#22C7C9] to-[#D9A441]" />

        {/* Close Button */}
        <button
          onClick={onCancel}
          type="button"
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-[#102E46] transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center space-y-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-[#B83A3A]/20 border border-[#B83A3A] flex items-center justify-center text-[#B83A3A] shadow-md">
            <AlertTriangle className="w-7 h-7 animate-bounce" />
          </div>
          <h3 className="font-cinzel text-xl font-black text-[#D9A441] tracking-wide">
            ¿Soltar este tesoro al mar?
          </h3>
        </div>

        {/* Character Preview Thumbnail */}
        <div className="flex items-center gap-4 p-3 bg-[#102E46]/80 rounded-xl border border-[#D9A441]/30 mb-4">
          <img
            src={portrait}
            alt={character.name}
            className="w-16 h-16 rounded-lg object-cover border border-[#D9A441] bg-[#071B2B]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getNauticalAvatarSvg(character.name, character.bounty);
            }}
          />
          <div>
            <h4 className="font-cinzel font-bold text-base text-[#F7FAFC]">{character.name}</h4>
            <p className="text-xs text-[#22C7C9] font-mono">
              Recompensa: {character.bounty ? `฿ ${character.bounty}` : 'Sin recompensa'}
            </p>
            <p className="text-xs text-[#E9D8B4]/70">
              {character.crew?.name || 'Pirata sin tripulación'}
            </p>
          </div>
        </div>

        {/* Educational Dark Pattern Message */}
        <div className="p-3 rounded-lg bg-[#2a0e0e]/60 border border-[#B83A3A]/40 mb-6 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#B83A3A]">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>¡ADVERTENCIA DEL CAPITÁN!</span>
          </div>
          <p className="text-xs text-[#E9D8B4]/90 italic leading-relaxed">
            "¿De verdad vas a abandonar a {character.name}? Un verdadero rey de los piratas nunca deja atrás a sus camaradas. Si lo expulsas de tu botín, podrías perderlo para siempre en los confines del Grand Line..."
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            type="button"
            className="px-5 py-2.5 rounded-xl border border-[#D9A441]/50 text-[#E9D8B4] hover:bg-[#102E46] text-sm font-semibold transition-colors cursor-pointer"
          >
            Conservar en botín
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B83A3A] hover:bg-[#962828] text-[#F7FAFC] text-sm font-bold tracking-wide shadow-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B83A3A]"
          >
            <Trash2 className="w-4 h-4" />
            <span>Quitar de favoritos</span>
          </button>
        </div>

      </div>
    </dialog>
  );
};
