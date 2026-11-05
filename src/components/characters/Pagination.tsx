import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipsis
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPages();

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 my-8" aria-label="Paginación de piratas">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        type="button"
        className="p-2 sm:px-3 sm:py-2 rounded-xl border border-[#D9A441]/40 bg-[#071B2B] text-[#E9D8B4] hover:bg-[#102E46] hover:text-[#22C7C9] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm font-semibold"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-[#E9D8B4]/60 font-bold">
                ...
              </span>
            );
          }
          const pageNumber = p as number;
          const isActive = pageNumber === currentPage;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-cinzel font-bold text-sm transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#D9A441] text-[#071B2B] shadow-lg ring-2 ring-[#D9A441]'
                  : 'bg-[#071B2B] text-[#E9D8B4] border border-[#D9A441]/30 hover:bg-[#102E46] hover:text-[#22C7C9]'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        type="button"
        className="p-2 sm:px-3 sm:py-2 rounded-xl border border-[#D9A441]/40 bg-[#071B2B] text-[#E9D8B4] hover:bg-[#102E46] hover:text-[#22C7C9] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm font-semibold"
        aria-label="Página siguiente"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};
