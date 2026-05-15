import { useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Camera, X, Grid2X2 } from "lucide-react";
import { createPreviewUrl } from "../../utils/imageUtils";
import type { OSFormData } from "../../types/formType";
import { motion } from "motion/react";
import { useState } from "react";

export function EvidencesField() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OSFormData>();

  const [captureMode, setCaptureMode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const evidences = watch("evidences") || [];
  const maxImages = 4;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (evidences.length + files.length > maxImages) {
      alert(`Você pode adicionar no máximo ${maxImages} fotos.`);
      return;
    }

    // createObjectURL é síncrono e instantâneo — zero processamento, zero risco de crash.
    // O File original é salvo no Dexie diretamente (Dexie suporta Blob/File nativamente).
    // Compressão para WebP será feita no backend quando o formulário for enviado.
    const newEvidences = files.map((file) => ({
      file,
      previewUrl: createPreviewUrl(file),
      size: file.size,
    }));

    setValue("evidences", [...evidences, ...newEvidences], {
      shouldValidate: true,
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    URL.revokeObjectURL(evidences[indexToRemove].previewUrl);
    setValue(
      "evidences",
      evidences.filter((_, index) => index !== indexToRemove),
      { shouldValidate: true },
    );
  };

  // Revoga todas as Object URLs ao desmontar o componente
  useEffect(() => {
    return () => {
      evidences.forEach((ev) => URL.revokeObjectURL(ev.previewUrl));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col p-4 border border-gray-200 rounded-xl bg-white shadow-sm w-[85%] sm:w-2/3 mx-auto">
      <div className="border-b border-gray-200 pb-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Evidências Fotográficas
        </h3>
      </div>

      {/* Toggle Galeria / Câmera */}
      <div className="relative mb-3 flex justify-center rounded-lg bg-gray-100 p-0.5 border">
        <button
          type="button"
          className="relative w-full py-2 px-4 uppercase"
          onClick={() => setCaptureMode(false)}
        >
          {!captureMode && (
            <motion.div
              layoutId="toggle-pill"
              className="absolute inset-0 rounded-md bg-gray-700"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <div
            className={`relative z-10 flex items-center justify-center gap-2
              ${!captureMode ? "text-white" : "text-gray-700"}`}
          >
            <Grid2X2 size={18} />
            <span className="font-semibold">Galeria</span>
          </div>
        </button>

        <button
          type="button"
          className="relative w-full py-2 px-4 uppercase"
          onClick={() => setCaptureMode(true)}
        >
          {captureMode && (
            <motion.div
              layoutId="toggle-pill"
              className="absolute inset-0 rounded-md bg-gray-700"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <div
            className={`relative z-10 flex items-center justify-center gap-2
              ${captureMode ? "text-white" : "text-gray-700"}`}
          >
            <Camera size={20} className="mb-0.5" />
            <span className="font-semibold">Câmera</span>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {evidences.map((evidence, index) => (
          <div
            key={evidence.previewUrl}
            className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm"
          >
            <img
              src={evidence.previewUrl}
              alt={`Evidência ${index + 1}`}
              className="w-full h-full object-cover"
            />
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

        {evidences.length < maxImages && (
          <>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed transition-colors cursor-pointer
                ${
                  errors.evidences
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }
              `}
            >
              <Camera className="text-gray-400 mb-2" size={32} />
              <span className="text-sm font-medium text-gray-500">
                Adicionar Foto
              </span>
            </button>

            <input
              type="file"
              accept="image/*"
              capture={captureMode || undefined}
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </>
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
