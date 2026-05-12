import { Field } from "./field";
import type { OSFormData } from "@/types/formType";
import { Controller, useFormContext } from "react-hook-form";
import { TextareaField } from "./textareaField";
import { inputStyles } from "./osForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function ServicesField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<OSFormData>();
  //!!- transform em um valor puramente booleano
  const hasErro = !!errors.maintenanceType;
  return (
    <div className="bg-white border-gray-300 rounded-lg border p-5 w-[85%] sm:w-2/3 mx-auto">
      <h2 className="text-xl lg:text-2xl font-semibold my-2">
        Serviços Executados
      </h2>
      <hr className="border-gray-500 " />
      <div className="flex flex-col min-h-22.5">
        <label htmlFor="maintenanceType" className="text-gray-700 my-2">
          Tipo de Manutenção
        </label>

        <Controller
          name="maintenanceType"
          control={control}
          rules={{ required: "Selecione o tipo de manutenção" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                id="maintenanceType"
                className={`${inputStyles({
                  status: hasErro ? "erro" : "default",
                })} w-full`}
              >
                <SelectValue placeholder="Selecione um tipo..." />
              </SelectTrigger>
              <SelectContent className="rounded">
                <SelectItem value="preventiva">Preventiva</SelectItem>
                <SelectItem value="corretiva">Corretiva</SelectItem>
                <SelectItem value="preditiva">Preditiva</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <Field label="Horas" name="hours" type="number" />
      <Field label="Valor/Hora" name="cost" type="text" isRequired />
      <TextareaField
        label="Descrição dos Serviços"
        name="serviceDescription"
        isRequired
      />
    </div>
  );
}
