import { useFormContext } from "react-hook-form";
import type { OSFormData } from "../../types/formType";
import { inputStyles } from "./osForm";
import { InputPhone } from "./inputPhone";

export function ClientField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OSFormData>();

  return (
    <div className="bg-white border-gray-300 rounded-lg border p-5 sm:w-2/3">
      <h2 className="text-xl lg:text-2xl font-semibold my-2">
        Dados do Cliente
      </h2>
      <hr />
      {/*altura mínima definida para evitar quebra de layout */}
      <div className="flex flex-col min-h-22.5">
        <label htmlFor="name" className="text-gray-700 my-2">
          Razão Social / Nome
        </label>
        <input
          type="text"
          id="name"
          //required não necessãrio no react hook form
          {...register("name", { required: "Campo obrigatório" })}
          className={inputStyles({ status: errors.name ? "erro" : "default" })}
        />
        {/*Mensagem de erro da validação */}
        {errors?.name && (
          <p className="text-[10px] text-red-700">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col min-h-22.5">
        <label htmlFor="cnpj" className="text-gray-700 my-2">
          CNPJ / CPF
        </label>
        <input
          type="text"
          id="cnpj"
          //required não necessãrio no react hook form
          {...register("cnpj")}
          className={inputStyles({ status: errors.cnpj ? "erro" : "default" })}
        />
      </div>
      <InputPhone />

      <div className="flex flex-col min-h-22.5">
        <label htmlFor="adress" className="text-gray-700 my-2">
          Endereço
        </label>
        <input
          type="text"
          id="adress"
          //required não necessãrio no react hook form
          {...register("adress", { required: "Campo obrigatório" })}
          className={inputStyles({
            status: errors.adress ? "erro" : "default",
          })}
        />
        {errors?.adress && (
          <p className="text-[10px] text-red-700">{errors.adress.message}</p>
        )}
      </div>
    </div>
  );
}
