import "./global.css";

import { ClientField } from "./components/form/clientField";
function App() {
  return (
    <div className="p-3">
      <h1 className="text-2xl">Início da Ordem de Serviço</h1>
      <ClientField />
    </div>
  );
}

export default App;
