import { useForm } from "react-hook-form";
import { ClientField } from "./clientField";
import type { OSFormData } from "../../types/formType";

export default function OSForm() {
  const { register, handleSubmit } = useForm<OSFormData>();

  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ClientField register={register} />
    </form>
  );
}
