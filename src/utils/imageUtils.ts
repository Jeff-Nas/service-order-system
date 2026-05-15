// utils/imageUtils.ts

/**
 * Cria uma URL temporária para preview imediato sem nenhum processamento.
 * Deve ser revogada com URL.revokeObjectURL() quando não for mais necessária.
 *
 * NOTA: compressão para WebP foi movida para o backend (futura API Route).
 * O File original é salvo diretamente no Dexie por enquanto.
 * Dexie suporta Blob/File nativamente — não precisa converter para salvar.
 */
export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};
