export interface EventoDTO {
  title: string;
  description: string;
  imageUrl: string;
  date: string;        // ISO 8601, p. ej. "2025-05-27T14:30:00"
  location: string;
  organizerId: string;
  ticketTypes: { name: string; price: number; stock: number }[];
}