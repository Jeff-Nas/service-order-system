import { Field } from "./field";
import { TextareaField } from "./textareaField";
import { type OSFormData } from "@/types/formType";
import { useFormContext, useFieldArray, type Path } from "react-hook-form";
import { Trash2 } from "lucide-react";

export function PartsField() {
  const { watch, control } = useFormContext<OSFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "parts",
  });

  return (
    <div className="bg-white border-gray-300 rounded-lg border p-5 sm:w-2/3 mx-auto">
      <h2 className="text-xl lg:text-2xl font-semibold my-2">
        Peças e Materiais
      </h2>
      <hr className="border-gray-500 " />
      {/*alterado de retorno implicito para explicito - usar const dentro do código */}
      {fields.map((field, index) => {
        const partNumber = watch(
          `parts.${index}.partNumber` as Path<OSFormData>,
        );

        return (
          <div key={field.id} className="relative mb-5">
            {fields.length > 1 && (
              //lixeira para deletar from de peça
              <div>
                <hr className="border-gray-500 " />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-500/60 text-sm"
                >
                  <Trash2 />
                </button>
              </div>
            )}
            <Field
              label="Número de Peça"
              name={`parts.${index}.partNumber` as const}
            />
            <Field
              label="QTD"
              name={`parts.${index}.quantity` as const}
              type="number"
              isRequired={partNumber ? true : false}
            />
            <Field
              label="Valor Unitário"
              name={`parts.${index}.unitValue` as const}
              isRequired={partNumber ? true : false}
            />
            <TextareaField
              label="Descrição da Peça"
              name={`parts.${index}.partDescription` as const}
            />
          </div>
        );
      })}
      <button
        type="button"
        onClick={() =>
          append({
            partNumber: "",
            quantity: 1,
            unitValue: "",
            partDescription: "",
          })
        }
        className="w-full mt-4 p-3 border-2 border-dashed border-gray-400 text-gray-600 bg-slate-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        + Adicionar Peça
      </button>
    </div>
  );
}
