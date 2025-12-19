export class CreateInterventionDto {
  deviceId: number;        // ID de l'appareil
  sparePartsIds: number[]; // IDs des pièces 
  description: string;    // Description de la réparation
}
