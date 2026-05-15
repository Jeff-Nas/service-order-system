import { useForm, FormProvider, Controller } from "react-hook-form";
import { ClientField } from "./clientField";
import { EquipamentField } from "./equipamentField";
import { ServicesField } from "./servicesField";
import { PartsField } from "./partsField";
import type { OSFormData } from "../../types/formType";
import { cva } from "class-variance-authority";
import { EvidencesField } from "./evidencesField";
import { SignatureField } from "./signatureField";

export const inputStyles = cva(
  "p-1 bg-gray-50 rounded outline-0 text-gray-700 w-full",
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
  const methods = useForm<OSFormData>({
    defaultValues: {
      parts: [
        {
          partNumber: "",
          quantity: 1,
          unitValue: "",
          partDescription: "",
        },
      ],
      technicianSignature: null,
      clientSignature: null,
    },
  });

  // Observa o nome do cliente para repassar à prop 'personName' da assinatura
  const clientName = methods.watch("clientName");

  function onSubmit(data: OSFormData) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 xl:grid xl:grid-cols-2 justify-center w-full mx-auto">
          <ClientField />
          <EquipamentField />
          <ServicesField />
          <PartsField />
          <EvidencesField />

          <div className="flex flex-col gap-3">
            {/* Assinatura do Técnico */}
            <div className="w-full flex justify-center bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
              <Controller
                name="technicianSignature"
                control={methods.control}
                rules={{
                  validate: (value) =>
                    value instanceof File ||
                    "A assinatura do técnico é obrigatória",
                }}
                render={({ field, fieldState }) => (
                  <SignatureField
                    label="Assinatura do Técnico"
                    personName="Técnico Responsável"
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>

            {/* Assinatura do Cliente */}
            <div className="w-full flex justify-center bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
              <Controller
                name="clientSignature"
                control={methods.control}
                rules={{
                  validate: (value) =>
                    value instanceof File ||
                    "A assinatura do cliente é obrigatória",
                }}
                render={({ field, fieldState }) => (
                  <SignatureField
                    label="Assinatura do Cliente"
                    personName={clientName} // O nome digitado no formulário aparecerá aqui
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
          </div>
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
