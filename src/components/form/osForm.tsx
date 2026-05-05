import { useForm } from "react-hook-form";
import { ClientField } from "./clientField";

export default function OSForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ClientField register={register} />
    </form>
  );
}
