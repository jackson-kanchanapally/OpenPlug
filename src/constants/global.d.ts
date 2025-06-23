export {};

declare global {
  type ChargerDoc = {
    ownerName: string;
    email: string;
    chargerType: string;
    costPerUnit: string;
    Address: string;
    chargerCompany: string;
    latitude: number;
    longitude: number;
  };
}
