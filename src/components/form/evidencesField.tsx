import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Camera, LoaderCircle, X } from "lucide-react";
import { compressToWebP } from "../../utils/imageUtils";
import type { OSFormData } from "../../types/formType";

export function EvidencesField() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OSFormData>();
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Observa o array de evidências atual (garante que inicie vazio caso undefined)
  const evidences = watch("evidences") || [];
  const maxImages = 4;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (evidences.length + files.length > maxImages) {
      alert(`Você pode adicionar no máximo ${maxImages} fotos.`);
      return;
    }

    setIsCompressing(true);

    try {
      const processedEvidences = await Promise.all(
        files.map(async (file) => {
          // Converte para WebP usando sua função utilitária
          const webpFile = await compressToWebP(file, 0.7);
          // Cria o link temporário para exibição
          const previewUrl = URL.createObjectURL(webpFile);

          return { file: webpFile, previewUrl };
        }),
      );

      // Atualiza o estado do formulário combinando as imagens antigas com as novas
      setValue("evidences", [...evidences, ...processedEvidences], {
        shouldValidate: true,
      });
    } catch (error) {
      console.error("Erro ao processar as imagens:", error);
      alert("Ocorreu um erro ao otimizar a imagem. Tente novamente.");
    } finally {
      setIsCompressing(false);
      // Limpa o input para permitir selecionar o mesmo arquivo novamente se o usuário o deletar
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    const imageToRemove = evidences[indexToRemove];

    // Limpeza crucial: libera a memória do navegador que estava alocada para essa pré-visualização
    URL.revokeObjectURL(imageToRemove.previewUrl);

    const newEvidences = evidences.filter(
      (_, index) => index !== indexToRemove,
    );
    setValue("evidences", newEvidences, { shouldValidate: true });
  };

  // Limpa as URLs temporárias se o componente for desmontado (ex: cancelou a OS)
  useEffect(() => {
    return () => {
      evidences.forEach((ev) => URL.revokeObjectURL(ev.previewUrl));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-xl bg-white shadow-sm w-full">
      <div className="border-b border-gray-200 pb-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Evidências Fotográficas
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Renderiza as imagens já adicionadas */}
        {evidences.map((evidence, index) => (
          <div
            key={evidence.previewUrl}
            className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200 shadow-sm"
          >
            <img
              src={evidence.previewUrl}
              alt={`Evidência ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Botão de excluir que aparece no canto superior */}
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 rounded-full transition-colors backdrop-blur-sm"
              title="Remover foto"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        ))}

        {/* Botão de Adicionar Foto - Só renderiza se tiver menos de 4 imagens */}
        {evidences.length < maxImages && (
          <label
            className={`flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed transition-colors cursor-pointer
              ${errors.evidences ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"}
              ${isCompressing ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {isCompressing ? (
              <LoaderCircle
                className="animate-spin text-blue-500 mb-2"
                size={32}
              />
            ) : (
              <Camera className="text-gray-400 mb-2" size={32} />
            )}
            <span className="text-sm font-medium text-gray-500">
              {isCompressing ? "Otimizando..." : "Adicionar Foto"}
            </span>

            <input
              type="file"
              accept="image/*"
              multiple // Permite selecionar várias de uma vez
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={isCompressing}
            />
          </label>
        )}
      </div>

      {errors.evidences && (
        <span className="text-red-500 text-sm mt-2 font-medium">
          {errors.evidences.message as string}
        </span>
      )}
    </div>
  );
}
