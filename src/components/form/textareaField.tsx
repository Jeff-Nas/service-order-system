import TextareaAutosize from "react-textarea-autosize";
import { useFormContext } from "react-hook-form";
import type { OSFormData } from "../../types/formType";
import { inputStyles } from "./osForm";

interface TextareaType {
  label: string;
  name: keyof OSFormData;
  isRequired?: boolean;
}

export function TextareaField({
  label,
  name,
  isRequired = false,
}: TextareaType) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OSFormData>();
  const fieldErrors = errors[name];

  return (
    <div className="flex flex-col min-h-22.5">
      <label htmlFor="defect" className="text-gray-700 my-2">
        {label}
      </label>
      <TextareaAutosize
        id="defect"
        minRows={3}
        {...register(name, {
          required: isRequired ? "Campo obrigatório" : false,
        })}
        className={`${inputStyles({
          status: fieldErrors ? "erro" : "default",
        })} resize-none`}
      />
      {/*Mensagem de erro da validação */}
      {fieldErrors && (
        <p className="text-[10px] text-red-700">{fieldErrors?.message}</p>
      )}
    </div>
  );
}
