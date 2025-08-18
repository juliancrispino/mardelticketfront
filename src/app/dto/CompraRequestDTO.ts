export interface CompraRequestDTO {
  eventoId: number;
  usuarioId: string;
  fechaCompra: string; // ISO 8601 format (ej: '2025-06-12T14:30:00Z')
  total: number;
  items: {
    ticketTypeId: number;
    cantidad: number;
    precioUnitario: number;
  }[];
}
