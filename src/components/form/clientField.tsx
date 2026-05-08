import { InputPhone } from "./inputPhone";
import { Field } from "./field";

export function ClientField() {
  return (
    <div className="bg-white border-gray-300 rounded-lg border p-5 sm:w-2/3 mx-auto">
      <h2 className="text-xl lg:text-2xl font-semibold my-2">
        Dados do Cliente
      </h2>
      <hr className="border-gray-500 " />
      {/*--------------Nome do Cliente----------------------*/}
      <Field
        label="Razão Social / Nome"
        name="clientName"
        type="text"
        isRequired
      />
      {/*--------------CNPJ / CPF---------------------------*/}
      <Field label="CNPJ / CPF" name="cnpj" type="text" isRequired={false} />
      {/*--------------Telefone do Cliente------------------*/}
      <InputPhone />
      {/*--------------Endereço-----------------------------*/}
      <Field label="Endereço" name="adress" type="text" isRequired />
    </div>
  );
}
