import { useForm } from "react-hook-form";
import { ClientField } from "./clientField";
import type { OSFormData } from "../../types/formType";

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
