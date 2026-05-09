type MaintenanceType = "preventiva" | "corretiva" | "preditiva";

export interface OSFormData {
  //cliente
  clientName: string;
  cnpj: string;
  phone: string;
  adress: string;
  //fabricante
  builder: string;
  model: string;
  serialNumber: number;
  hourmeter: string;
  defect: string;
  //serviços executados
  maintenanceType: MaintenanceType;
  hours: number;
  cost: string;
  serviceDescription: string;
}
