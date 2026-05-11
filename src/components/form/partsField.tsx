import { Field } from "./field";
import { TextareaField } from "./textareaField";
import { type OSFormData } from "@/types/formType";
import { useFormContext } from "react-hook-form";

export function PartsField() {
  const { watch } = useFormContext<OSFormData>();

  const partNumber = watch("partNumber");

  return (
    <div className="bg-white border-gray-300 rounded-lg border p-5 sm:w-2/3 mx-auto">
      <h2 className="text-xl lg:text-2xl font-semibold my-2">
        Peças e Materiais
      </h2>
      <hr className="border-gray-500 " />
      <Field label="Número de Peça" name="partNumber" placeholder="PN" />
      {/*Cliente pode ajustar essa regra de negócio */}
      <Field
        label="QTD"
        type="number"
        name="quantity"
        isRequired={partNumber ? true : false}
      />
      <Field
        label="Valor Unitário"
        name="unitValue"
        isRequired={partNumber ? true : false}
      />
      <TextareaField label="Descrição da peça" name="partDescription" />
    </div>
  );
}
