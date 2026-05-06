import { useForm } from "react-hook-form";
import { ClientField } from "./clientField";
import type { OSFormData } from "../../types/formType";
import { cva } from "class-variance-authority";

export const inputStyles = cva(
  "p-1 bg-gray-50 rounded outline-0 transition-all",
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OSFormData>();

  function onSubmit(data: OSFormData) {
    console.log(data);
  }

  return (
    //O primeiro render roda handleSubmit que retorna outra função - pronta para p submit
    <form onSubmit={handleSubmit(onSubmit)}>
      <ClientField register={register} errors={errors} />
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Gerar OS
      </button>
    </form>
  );
}
