import { type OSFormData } from "../../types/formType";
import { useFormContext } from "react-hook-form";
import { inputStyles } from "./osForm";
//keyof OSFormData = valor dessa prop só pode ser uma das chaves que existem lá na interface
interface FieldTypes {
  label: string;
  name: keyof OSFormData;
  type: string;
  isRequired: boolean;
}

export function Field({ label, name, type, isRequired }: FieldTypes) {
  const {
    register,
    formState: { errors },
  } = useFormContext<OSFormData>();

  //erros[name] se repetia muito
  const fieldErrors = errors[name];
  return (
    //altura mínima definida para evitar quebra de layout
    <div className="flex flex-col min-h-22.5">
      <label htmlFor={name} className="text-gray-700 my-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        //definindo o que será retornado para o required
        {...register(name, {
          required: isRequired ? "Campo obrigatório" : false,
        })}
        className={inputStyles({
          status: fieldErrors ? "erro" : "default",
        })}
      />
      {/*Mensagem de erro da validação */}
      {fieldErrors && (
        <p className="text-[10px] text-red-700">{fieldErrors?.message}</p>
      )}
    </div>
  );
}
