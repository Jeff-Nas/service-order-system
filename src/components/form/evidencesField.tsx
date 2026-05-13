import React, { useRef, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Camera, X, LoaderCircle } from "lucide-react";
import { type OSFormData } from "@/types/formType";
import { compressToWebP } from "@/utils/imageUtils";

export function EvidencesField() {
  // Mantemos apenas um estado global de loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control } = useFormContext<OSFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "evidences",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // 1. Liga o Loading ANTES de começar o loop
    setIsLoading(true);

    const availableSlots = 4 - fields.length;
    const filesToProcess = Array.from(files).slice(0, availableSlots);

    for (const file of filesToProcess) {
      try {
        const webpFile = await compressToWebP(file, 0.7);
        const previewUrl = URL.createObjectURL(webpFile);

        append({
          file: webpFile,
          previewUrl: previewUrl,
        });
      } catch (error) {
        console.log("Erro ao processar a imagem", error);
      }
    }

    // 2. Desliga o Loading APENAS no final de tudo, fora do loop!
    setIsLoading(false);

    // Limpa o input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white border-gray-300 rounded-lg border p-5 sm:w-2/3 mx-auto mt-6">
      <h2 className="text-xl lg:text-2xl font-semibold my-2 text-gray-800">
        Evidências Fotográficas
      </h2>
      <hr className="border-gray-300 mb-6" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Renderização das Imagens que JÁ FORAM processadas */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative aspect-square group rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={field.previewUrl}
              alt={`Evidência ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {/* Botão de Adicionar / Placeholder de Loading */}
        {fields.length < 4 && (
          <button
            type="button"
            disabled={isLoading} // Desabilita o clique enquanto carrega
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-colors"
          >
            {isLoading ? (
              // Mostra o Spinner girando
              <div className="flex flex-col items-center">
                <LoaderCircle className="animate-spin w-8 h-8 mb-2 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">
                  Otimizando...
                </span>
              </div>
            ) : (
              // Mostra a Câmera normal
              <div className="flex flex-col items-center">
                <Camera className="w-8 h-8 mb-2 text-gray-400" />
                <span className="text-sm font-medium">Adicionar Foto</span>
              </div>
            )}
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
      />
    </div>
  );
}
