import { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";
import { Eraser } from "lucide-react";

interface SignatureFieldProps {
  label: string;
  personName?: string;
  error?: string;
  onChange: (file: File | null) => void;
}

export function SignatureField({
  label,
  personName,
  error,
  onChange,
}: SignatureFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      // Salva o desenho atual antes de redimensionar
      const data = padRef.current?.toData();

      // Sincroniza os atributos internos com o tamanho CSS real
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;

      const ctx = canvas.getContext("2d");
      ctx?.scale(ratio, ratio);

      // Restaura o desenho após redimensionar
      if (data) padRef.current?.fromData(data);
    };

    padRef.current = new SignaturePad(canvas, { penColor: "#1f2937" });

    // Redimensiona imediatamente e observa mudanças futuras
    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);

    padRef.current.addEventListener("endStroke", () => {
      if (!padRef.current || padRef.current.isEmpty()) return;

      const dataURL = canvas.toDataURL("image/png");
      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) u8arr[n] = bstr.charCodeAt(n);

      const fileName = `assinatura_${label.toLowerCase().replace(/\s+/g, "_")}.png`;
      onChange(new File([u8arr], fileName, { type: mime }));
    });

    return () => {
      observer.disconnect();
      padRef.current?.off();
    };
  }, [label, onChange]);

  const handleClear = () => {
    padRef.current?.clear();
    onChange(null);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <div className="flex justify-between items-end mb-2 px-1">
        <span className="text-gray-800 font-medium text-sm md:text-base">
          {label}
        </span>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs md:text-sm flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors bg-gray-100 hover:bg-red-50 px-2 py-1 rounded-md"
        >
          <Eraser size={14} />
          Apagar
        </button>
      </div>

      <div
        className={`relative w-full h-32 md:h-40 bg-gray-50 rounded-xl overflow-hidden border transition-colors ${
          error
            ? "border-red-500 ring-1 ring-red-500"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair touch-none"
        />
      </div>

      <div className="mt-4 border-t border-gray-400 pt-2 text-center mx-4">
        <p className="text-gray-700 font-medium text-base md:text-lg min-h-6">
          {personName || "_________________________"}
        </p>
      </div>

      {error && (
        <span className="text-red-500 text-sm mt-1 px-1 font-medium">
          {error}
        </span>
      )}
    </div>
  );
}
