import { useForm, FormProvider } from "react-hook-form";
import { ClientField } from "./clientField";
import { EquipamentField } from "./equipamentField";
import type { OSFormData } from "../../types/formType";
import { cva } from "class-variance-authority";
import { ServicesField } from "./servicesField";

export const inputStyles = cva(
  "p-1 bg-gray-50 rounded outline-0 text-gray-700",
  {
    variants: {
      status: {
        default:
          "border border-gray-300 focus:bg-gray-100 focus:ring focus:ring-gray-700",
        erro: "ring-red-700 focus:ring-red-700 ring-1",
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);

export default function OSForm() {
  const methods = useForm<OSFormData>();

  function onSubmit(data: OSFormData) {
    console.log(data);
  }

  return (
    //O primeiro render roda handleSubmit que retorna outra função - pronta para p submit
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/*testando o justify center */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2  justify-center max-w-5xl mx-auto">
          <ClientField />
          <EquipamentField />
          <ServicesField />
        </div>
        <div className="flex w-full lg:justify-end">
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded lg:w-60 lg:font-semibold lg:text-xl"
          >
            Gerar OS
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
