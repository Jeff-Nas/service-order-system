export function ClientField({ register }: any) {
  return (
    <div className="bg-white border-gray-300 rounded-lg border max-w-80 p-5">
      <h2 className="text-xl font-semibold my-2">Dados do Cliente</h2>
      <hr />
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-700 my-2">
          Razão Social / Nome
        </label>
        <input
          type="text"
          id="name"
          //required não necessãrio no react hook form
          {...register("name", { required: "Campo obrigatório" })}
          className="p-1 bg-gray-50 rounded border border-gray-300"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="cnpj" className="text-gray-700 my-2">
          CNPJ / CPF
        </label>
        <input
          type="text"
          id="cnpj"
          //required não necessãrio no react hook form
          {...register("cnpj", { required: "Campo obrigatório" })}
          className="p-1 bg-gray-50 rounded border border-gray-300"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="cnpj" className="text-gray-700 my-2">
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          //required não necessãrio no react hook form
          {...register("phone", { required: "Campo obrigatório" })}
          className="p-1 bg-gray-50 rounded border border-gray-300"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="adress" className="text-gray-700 my-2">
          Endereço
        </label>
        <input
          type="text"
          id="adress"
          //required não necessãrio no react hook form
          {...register("adress", { required: "Campo obrigatório" })}
          className="p-1 bg-gray-50 rounded border border-gray-300"
        />
      </div>
    </div>
  );
}
