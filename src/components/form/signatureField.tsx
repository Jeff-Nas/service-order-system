import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
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
  const sigPad = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    if (sigPad.current) {
      sigPad.current.clear();
      onChange(null);
    }
  };

  const handleEnd = () => {
    if (!sigPad.current) return;

    // Workaround de timing: aguarda um tick antes de checar
    // Em mobile, isEmpty() pode retornar true se chamado imediatamente no onEnd
    setTimeout(() => {
      if (!sigPad.current || sigPad.current.isEmpty()) return;

      const canvas = sigPad.current.getTrimmedCanvas();
      const dataURL = canvas.toDataURL("image/png");

      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      const fileName = `assinatura_${label.toLowerCase().replace(/\s+/g, "_")}.png`;
      const file = new File([u8arr], fileName, { type: mime });

      onChange(file);
    }, 0);
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
        <SignatureCanvas
          ref={sigPad}
          onEnd={handleEnd}
          clearOnResize={false}
          penColor="#1f2937"
          canvasProps={{
            className: "w-full h-full cursor-crosshair",
            style: { touchAction: "none" },
          }}
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
