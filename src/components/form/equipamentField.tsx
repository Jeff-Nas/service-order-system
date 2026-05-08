import { useFormContext } from "react-hook-form";
import type { OSFormData } from "../../types/formType";
import { inputStyles } from "./osForm";
import TextareaAutosize from "react-textarea-autosize";
import { Field } from "./field";

export function EquipamentField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OSFormData>();

  return (
    <div className="bg-white border-gray-300 rounded-lg border p-5 sm:w-2/3 mx-auto">
      <h2 className="text-xl lg:text-2xl font-semibold my-2">
        Dados do Equipamento
      </h2>
      <hr className="border-gray-500 " />

      {/*----------------Fabricante------------------------------*/}
      <Field label="Fabricante" name="builder" type="text" isRequired />

      {/*-------------------Modelo-------------------------------- */}
      <Field label="Modelo" name="model" type="text" isRequired />

      {/*------------------Número de Série----------------------- */}
      <Field
        label="Número de Série"
        name="serialNumber"
        type="number"
        isRequired={false}
      />

      {/*------------------Horímetro------------------------------ */}
      <Field
        label="Horímetro"
        name="hourmeter"
        type="text"
        isRequired={false}
      />

      {/*-----------------Defeito Relatado-------------------------- */}
      <div className="flex flex-col min-h-22.5">
        <label htmlFor="defect" className="text-gray-700 my-2">
          Defeito Relatado
        </label>
        <TextareaAutosize
          id="defect"
          minRows={3}
          {...register("defect", { required: "Campo obrigatório" })}
          className={`${inputStyles({
            status: errors.defect ? "erro" : "default",
          })} resize-none`}
        />
        {/*Mensagem de erro da validação */}
        {errors?.defect && (
          <p className="text-[10px] text-red-700">{errors.defect?.message}</p>
        )}
      </div>
    </div>
  );
}
