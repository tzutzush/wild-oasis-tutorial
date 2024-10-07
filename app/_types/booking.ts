export type BookingWithRelatedCabin = {
  id: number;
  created_at: string;
  startDate: string | null;
  endDate: string | null;
  numNights: number | null;
  numGuests: number | null;
  totalPrice: number | null;
  guestId: number | null;
  cabinId: number | null;
  //The plural is only because of Supabase, as it is from the name
  //of the table.
  cabins: { name: string | null; image: string | null } | null;
};

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
};
