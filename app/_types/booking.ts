export type Booking = {
  id: number;
  created_at: string;
  startDate: string | null;
  endDate: string | null;
  numNights: number | null;
  numGuests: number | null;
  totalPrice: number | null;
  guestId: number | null;
  cabinId: number | null;
  cabins: { name: string | null; image: string | null } | null;
};
