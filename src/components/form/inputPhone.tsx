import { IMaskInput } from "react-imask";
import { Controller, useFormContext } from "react-hook-form";
import { type OSFormData } from "../../types/formType";
import { inputStyles } from "./osForm";

//entradas = control, classname, errors

export function InputPhone() {
  //Cuidado: se usar useForm um novo form será criado - precisa  de useFormContext para acessar os dados
  const {
    control,
    formState: { errors },
  } = useFormContext<OSFormData>();
  return (
    <div className="flex flex-col min-h-22.5">
      <label htmlFor="phone" className="text-gray-700 my-2">
        Telefone
      </label>
      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Campo obrigatório",
          //validação para impedir envios incompletos (ex: "(85) 99")
          validate: (value) => {
            if (!value) return true;
            return value.length >= 14 || "Telefone incompleto";
          },
        }}
        render={({ field }) => (
          //Biblioteca para validação de telefone com 9 ou 8 dígitos
          <IMaskInput
            // Espalha as props (name, value, onChange, onBlur e ref) etck
            {...field}
            id="phone"
            type="tel"
            mask={[{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }]}
            //IMask precisa do onAccept para garantir
            // que o Hook Form receba o valor formatado corretamente
            onAccept={(value) => field.onChange(value)}
            className={inputStyles({
              status: errors.phone ? "erro" : "default",
            })}
          />
        )}
      />
      {errors?.phone && (
        <p className="text-[10px] text-red-700">{errors.phone.message}</p>
      )}
    </div>
  );
}
